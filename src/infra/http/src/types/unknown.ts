export type UnknownField = 'unknown';
export const UNKNOWN_FIELD: string = 'unknown';

export const isUnknown = (value: string): boolean => value === UNKNOWN_FIELD;
