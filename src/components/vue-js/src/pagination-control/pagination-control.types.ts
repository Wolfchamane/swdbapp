export interface PaginationControlProperties {
    currentPage: number;
    totalPages: number;
    disabled: boolean;
    min: number;
}

export interface PaginationControlEvents {
    (e: 'paginate', nextPage: number): void;
}
