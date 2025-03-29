export const strToURL = (value: string): URL | null =>
    value.startsWith('http') ? new URL(value) : null;
