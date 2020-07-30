export interface FormattedEstimate {
    message: string;
    percent?: number;
}

const UNITS = ["B", "K", "M", "G", "T"]; // as though that last one will ever get used.
const UNIT_SIZE = 1024;
const UNIT_CUTOFF = UNIT_SIZE + (UNIT_SIZE / 4);

function formatStorageValue(bytes: number): string {
    let unitIndex = 0;
    let value = bytes;
    while (value > UNIT_CUTOFF && unitIndex < UNITS.length - 1) {
        unitIndex++;
        value /= UNIT_SIZE;
    }
    if (value >= 99.95 || unitIndex === 0) { // 99.95 rounds up to 100.0 with single-decimal precision
        return "" + value.toFixed(0) + UNITS[unitIndex];
    } else {
        return "" + value.toFixed(1) + UNITS[unitIndex];
    }
}

export async function estimateStorage(): Promise<FormattedEstimate> {
    const estimate = await navigator.storage.estimate();
    if (estimate.usage !== undefined) {
        if (estimate.quota !== undefined) {
            return {
                message: `Approx. ${formatStorageValue(estimate.usage)} used of ${formatStorageValue(estimate.quota)}`,
                percent: (estimate.usage / estimate.quota) * 100,
            };
        } else {
            return {
                message: `Approx. ${formatStorageValue(estimate.usage)} used`,
            };
        }
    } else {
        if (estimate.quota !== undefined) {
            return {
                message: `Approx. ${formatStorageValue(estimate.quota)} available`,
            };
        } else {
            return {
                message: `Storage estimate unavailable`,
            };
        }
    }
}

export default estimateStorage;
