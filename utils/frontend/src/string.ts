import type { Nullable } from '@swdbapp/types';

export const strToURL = (value: string): URL | null => (value.startsWith('http') ? new URL(value) : null);

export const notAvailableString = (value?: Nullable<string>): string => {
	return value || 'N/A';
};
