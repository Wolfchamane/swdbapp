type Nullable<T> = T | null;

export interface PaginationInfo {
	total: number;
	page: number;
	limit: number;
	next: Nullable<string>;
	prev: Nullable<string>;
}

export interface ListOutput<T> {
	info: PaginationInfo;
	data: T[];
}
