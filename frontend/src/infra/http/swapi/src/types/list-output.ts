import type { Nullable } from '@swdbapp/types';

export interface ListOutput<T> {
	count: number;
	next: Nullable<string>;
	previous: Nullable<string>;
	results: T[];
}
