export interface ListOutput<T> {
	count: number;
	next?: string;
	previous?: string;
	results: T[];
}
