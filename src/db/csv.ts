import { dbPromise, ENTRY_STORE_NAME } from "./database";
import { iterateCursor } from "./idbHelpers";
import { Entry } from "./models";
import stringify from "csv-stringify";

export async function exportCSV(): Promise<Blob> {
    const db = await dbPromise;
    const txn = db.transaction(ENTRY_STORE_NAME, "readonly");
    const entryStore = txn.objectStore(ENTRY_STORE_NAME);

    return new Promise((resolve, reject) => {
        const blobParts: string[] = [];
        const stringifier = stringify();
        stringifier.on("readable", () => {
            let row = stringifier.read();
            while (row) {
                blobParts.push(row);
                row = stringifier.read();
            }
        });
        stringifier.on("error", err => {
            txn.abort();
            reject(err);
        });
        stringifier.on("finish", () => {
            resolve(new Blob(blobParts, { type: "text/csv" }));
        });

        stringifier.write(["Date", "Mood"])
        iterateCursor(entryStore.openCursor(), cursor => {
            const entry: Entry = cursor.value;
            stringifier.write([entry.date, entry.mood.toString()]);
        }).then(() => stringifier.end());
    });
}
