export function withConsoleGroup(data: any, callback: () => void) {
    try {
        console.group(data);
        callback();
    } finally {
        console.groupEnd();
    }
}
