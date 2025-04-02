export type ListInputOrderDirection = 'asc' | 'desc';
export const LIST_INPUT_ORDER_DIRECTIONS: Record<string, ListInputOrderDirection> = {
    ASC: 'asc' as ListInputOrderDirection,
    DESC: 'desc' as ListInputOrderDirection,
};

export interface ListInput<T> {
    offset?: number;
    limit?: number;
    orderBy?: keyof T;
    orderDir?: ListInputOrderDirection;
    searchBy?: keyof T;
    search?: string;
}
