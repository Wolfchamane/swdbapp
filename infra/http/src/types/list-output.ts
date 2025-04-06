export interface ListOutput<T> {
	limit: number;
	offset: number;
	total: number;
	items: T[];
}
