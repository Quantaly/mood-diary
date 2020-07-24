export function idbRequestToPromise<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        request.addEventListener("success", () => resolve(request.result));
        request.addEventListener("error", () => reject(request.error));
    });
}

export function completeTransaction(txn: IDBTransaction): Promise<void> {
    return new Promise((resolve, reject) => {
        txn.addEventListener("complete", () => resolve());
        txn.addEventListener("error", () => reject(txn.error));
    });
}

/// If the callback returns false or nothing, the iterator will call cursor.continue()
export function iterateCursor<T extends IDBCursor>(cursorRequest: IDBRequest<T | null>, callback: (cursor: T) => boolean | void): Promise<void> {
    return new Promise((resolve, reject) => {
        cursorRequest.addEventListener("success", () => {
            const cursor = cursorRequest.result;
            if (cursor && !callback(cursor)) {
                cursor.continue();
            } else {
                resolve();
            }
        });
        cursorRequest.addEventListener("error", () => reject(cursorRequest.error));
    });
}
