export interface PaginationControlProperties {
	currentPage: number;
	totalPages: number;
	min: number;
	disabled?: boolean;
}

export interface PaginationControlEvents {
	(e: 'paginate', nextPage: number): void;
}
