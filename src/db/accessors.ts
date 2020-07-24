import { dbPromise, ENTRY_STORE_NAME, MUSINGS_STORE_NAME, MUSINGS_ENTRY_INDEX_NAME } from "./database";
import { idbRequestToPromise, completeTransaction } from "./idbHelpers";
import { Entry, Musings, MusingsType } from "./models";

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

export async function createMusingsForDate(date: string | Date, type: MusingsType): Promise<number> {
    date = convertAndCheckDate(date);
    const db = await dbPromise;
    const txn = db.transaction([ENTRY_STORE_NAME, MUSINGS_STORE_NAME], "readwrite");
    const entryStore = txn.objectStore(ENTRY_STORE_NAME);
    const musingsStore = txn.objectStore(MUSINGS_STORE_NAME);
    if (!(await idbRequestToPromise(entryStore.count(date)) > 0)) {
        txn.abort();
        throw `${date} does not have an entry`;
    }
    const newMusings: Musings = {
        entry: date,
        type: type,
        contents: "",
    };
    const ret = await idbRequestToPromise(musingsStore.add(newMusings));
    await completeTransaction(txn);
    return ret as number;
}

export async function getMusingsKeysForDate(date: string | Date): Promise<number[]> {
    date = convertAndCheckDate(date);
    const db = await dbPromise;
    const txn = db.transaction(MUSINGS_STORE_NAME, "readonly");
    const musingsStore = txn.objectStore(MUSINGS_STORE_NAME);
    const musingsEntryIndex = musingsStore.index(MUSINGS_ENTRY_INDEX_NAME);
    return idbRequestToPromise(musingsEntryIndex.getAllKeys(date)) as Promise<number[]>;
}

export async function getMusingsByKey(key: number): Promise<Musings> {
    const db = await dbPromise;
    const txn = db.transaction(MUSINGS_STORE_NAME, "readonly");
    const musingsStore = txn.objectStore(MUSINGS_STORE_NAME);
    return idbRequestToPromise(musingsStore.get(key));
}

export async function saveMusings(musings: Musings, key: number): Promise<number> {
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
