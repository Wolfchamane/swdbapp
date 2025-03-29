import type { Film } from '../types';
import type { Nullable } from '@swdbapp/types';

export interface FilmsPorts {
    list(input: FilmsListPortInput): Promise<FilmsListPortOutput<Film>>;
    detail(input: FilmsListDetailInput): Promise<Film>;
}

export interface FilmsListPortInput {
    page?: number;
    search?: string;
}

export interface FilmsListPortOutput<T> {
    count: number;
    next: Nullable<URL>;
    previous: Nullable<URL>;
    results: T[];
}

export interface FilmsListDetailInput {
    id: string;
}
