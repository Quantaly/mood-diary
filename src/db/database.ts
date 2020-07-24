import { idbRequestToPromise, completeTransaction, getAllPrimaryKeysAndValues } from './idbHelpers';
import { withConsoleGroup } from '../consoleHelpers';
import { Entry, Musings, KeyedMusings } from './models';

const DATABASE_VERSION = 1;
const DATABASE_NAME = "mood-diary:db";

const ENTRY_STORE_NAME = "entry";
const MUSINGS_STORE_NAME = "musings";
const MUSINGS_ENTRY_INDEX_NAME = "entry";

// not using idbRequestToPromise here bc it really isn't much logic and I need the additional handlers
const dbPromise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
    request.addEventListener("blocked", () => {
        alert("Please close all other tabs with this site open!");
        reject(request.error);
    });
    request.addEventListener("upgradeneeded", event => {
        const db = request.result;
        withConsoleGroup(`Upgrading database from ${event.oldVersion} to ${event.newVersion}`, () => {
            for (let currentVersion = event.oldVersion; currentVersion < (event.newVersion as number); currentVersion++) {
                withConsoleGroup(`${currentVersion} -> ${currentVersion + 1}`, () => {
                    switch (currentVersion) {
                        case 0:
                            {
                                const entryStore = db.createObjectStore(ENTRY_STORE_NAME, { keyPath: "date" });
                                const musingsStore = db.createObjectStore(MUSINGS_STORE_NAME, { autoIncrement: true });
                                const musingsEntryIndex = musingsStore.createIndex(MUSINGS_ENTRY_INDEX_NAME, "entry");
                            }
                            break;
                    }
                });
            }
        });
    });
});

const entryKeyRegex = /^\d\d\d\d-\d\d-\d\d$/;

export function dateToEntryKey(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function convertAndCheckDate(date: string | Date): string {
    if (date instanceof Date) {
        date = dateToEntryKey(date);
    }
    if (!entryKeyRegex.test(date)) {
        throw `${date} is not a valid date string`;
    }
    return date;
}

export async function getEntries(): Promise<Entry[]> {
    const db = await dbPromise;
    const txn = db.transaction(ENTRY_STORE_NAME, "readonly");
    const entryStore = txn.objectStore(ENTRY_STORE_NAME);
    return idbRequestToPromise(entryStore.getAll());
}

export async function getEntryForDate(date: string | Date, orCreate?: true): Promise<Entry>;
export async function getEntryForDate(date: string | Date, orCreate: false): Promise<Entry | undefined>;
export async function getEntryForDate(date: string | Date, orCreate?: boolean): Promise<Entry | undefined> {
    date = convertAndCheckDate(date);
    const db = await dbPromise;
    if (orCreate || orCreate === undefined) {
        const txn = db.transaction(ENTRY_STORE_NAME, "readwrite");
        const entryStore = txn.objectStore(ENTRY_STORE_NAME);
        const entry = await idbRequestToPromise(entryStore.get(date));
        if (entry === undefined) {
            const entry: Entry = { date, mood: 0 };
            await idbRequestToPromise(entryStore.put(entry));
            await completeTransaction(txn);
            return entry;
        } else {
            return entry;
        }
    } else {
        const txn = db.transaction(ENTRY_STORE_NAME, "readonly");
        const entryStore = txn.objectStore(ENTRY_STORE_NAME);
        return idbRequestToPromise(entryStore.get(date));
    }
}

export async function saveEntry(entry: Entry): Promise<void> {
    if (!entryKeyRegex.test(entry.date)) {
        throw `${entry.date} is not a valid date string`;
    }
    const db = await dbPromise;
    const txn = db.transaction(ENTRY_STORE_NAME, "readwrite");
    const entryStore = txn.objectStore(ENTRY_STORE_NAME);
    await idbRequestToPromise(entryStore.put(entry));
    await completeTransaction(txn);
}

export async function getMusingsForDate(date: string | Date): Promise<KeyedMusings[]> {
    date = convertAndCheckDate(date);
    const db = await dbPromise;
    const txn = db.transaction(MUSINGS_STORE_NAME, "readonly");
    const musingsStore = txn.objectStore(MUSINGS_STORE_NAME);
    const musingsEntryIndex = musingsStore.index(MUSINGS_ENTRY_INDEX_NAME);
    const kvMaps = await getAllPrimaryKeysAndValues(musingsEntryIndex, date);
    return kvMaps.map(m => {
        return {
            key: m.key,
            ...m.value,
        };
    });
}

export async function saveMusings(musings: Musings, key?: number): Promise<number>;
export async function saveMusings(musings: KeyedMusings): Promise<number>;
export async function saveMusings(musings: Musings | KeyedMusings, key?: number): Promise<number> {
    if ("key" in musings) {
        return saveMusings({ entry: musings.entry, type: musings.type, contents: musings.contents }, musings.key);
    }
    if (!entryKeyRegex.test(musings.entry)) {
        throw `${musings.entry} is not a valid date string`;
    }
    const db = await dbPromise;
    const txn = db.transaction(MUSINGS_STORE_NAME, "readwrite");
    const musingsStore = txn.objectStore(MUSINGS_STORE_NAME);
    const ret = await idbRequestToPromise(musingsStore.put(musings, key));
    await completeTransaction(txn);
    return ret as number;
}
