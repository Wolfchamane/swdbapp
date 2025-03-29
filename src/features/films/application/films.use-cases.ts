import type { FilmsPorts } from './films.ports';
import type { Film } from '../types';
import type { Nullable } from '@swdbapp/types';

export interface FilmsListUseCaseInput {
    page?: number;
    search?: string;
}

export interface FilmsListUseCaseOutput<T> {
    count: number;
    next: Nullable<URL>;
    previous: Nullable<URL>;
    results: T[];
}

export interface FilmsDescribeUseCaseInput {
    id: string;
}

export interface FilmsUseCases {
    list(input: FilmsListUseCaseInput): Promise<FilmsListUseCaseOutput<Film>>;
    describe(input: FilmsDescribeUseCaseInput): Promise<Film>;
}

export class DefaultFilmUseCases
    implements FilmsUseCases {

    constructor(private readonly ports: FilmsPorts) {}

    describe(input: FilmsDescribeUseCaseInput): Promise<Film> {
        return this.ports.detail(input);
    }

    list(input: FilmsListUseCaseInput): Promise<FilmsListUseCaseOutput<Film>> {
        return this.ports.list(input);
    }
}
