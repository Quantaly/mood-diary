import { withConsoleGroup } from '../consoleHelpers';

export const DATABASE_VERSION = 1;
export const DATABASE_NAME = "mood-diary:db";

export const ENTRY_STORE_NAME = "entry";
export const MUSINGS_STORE_NAME = "musings";
export const MUSINGS_ENTRY_INDEX_NAME = "entry";

// not using idbRequestToPromise here bc it really isn't much logic and I need the additional handlers
export const dbPromise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
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

