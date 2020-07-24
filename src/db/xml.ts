import { dbPromise, ENTRY_STORE_NAME, MUSINGS_STORE_NAME, MUSINGS_ENTRY_INDEX_NAME } from "./database";
import { idbRequestToPromise, iterateCursor, completeTransaction } from "./idbHelpers";
import { Entry, Musings, MusingsType } from "./models";

function ifExtant<T>(value: T | null | undefined, callback: (arg: T) => void) {
    if (value !== null && value !== undefined) {
        callback(value);
    }
}
const ie = ifExtant;

export async function importXML(xml: Blob): Promise<void> {
    const text = await xml.text();
    const parser = new DOMParser();
    const xDoc = parser.parseFromString(text, "text/xml");

    const db = await dbPromise;
    const txn = db.transaction([ENTRY_STORE_NAME, MUSINGS_STORE_NAME], "readwrite");
    const entryStore = txn.objectStore(ENTRY_STORE_NAME);
    const musingsStore = txn.objectStore(MUSINGS_STORE_NAME);

    const promises: Promise<any>[] = [];

    ie(xDoc.querySelector("diary"), diary => {
        for (const entry of diary.querySelectorAll("entry")) {
            ie(entry.getAttribute("date"), date => {
                ie(entry.getAttribute("mood"), moodStr => {
                    const mood = Number.parseInt(moodStr);
                    const entryData: Entry = { date, mood };
                    promises.push(idbRequestToPromise(entryStore.put(entryData)));

                    for (const musings of entry.querySelectorAll("musings")) {
                        ie(musings.getAttribute("type"), type => {
                            const musingsData: Musings = {
                                entry: date,
                                type: type as MusingsType,
                                contents: musings.textContent || "",
                            };
                            promises.push(idbRequestToPromise(musingsStore.put(musingsData)));
                        });
                    }
                });
            });
        }
    });

    await Promise.all(promises);
    await completeTransaction(txn);
}

export async function exportXML(): Promise<Blob> {
    const db = await dbPromise;
    const txn = db.transaction([ENTRY_STORE_NAME, MUSINGS_STORE_NAME], "readonly");
    const entryStore = txn.objectStore(ENTRY_STORE_NAME);
    const musingsStore = txn.objectStore(MUSINGS_STORE_NAME);
    const musingsEntryIndex = musingsStore.index(MUSINGS_ENTRY_INDEX_NAME);

    const xDoc = new Document();
    const diaryE = xDoc.createElement("diary");
    xDoc.appendChild(diaryE);

    const promises: Promise<any>[] = [];

    await iterateCursor(entryStore.openCursor(), entryCursor => {
        const entry: Entry = entryCursor.value;
        const entryE = xDoc.createElement("entry");
        diaryE.appendChild(entryE);
        entryE.setAttribute("date", entry.date);
        entryE.setAttribute("mood", entry.mood.toString());

        promises.push(iterateCursor(musingsEntryIndex.openCursor(entry.date), musingsCursor => {
            const musings: Musings = musingsCursor.value;
            const musingsE = xDoc.createElement("musings");
            entryE.appendChild(musingsE);
            musingsE.setAttribute("type", musings.type);
            musingsE.appendChild(xDoc.createTextNode(musings.contents));
        }));
    });

    await Promise.all(promises);

    const ser = new XMLSerializer();
    const xmlStr = ser.serializeToString(xDoc);
    return new Blob([xmlStr], { type: "text/xml" });
}
