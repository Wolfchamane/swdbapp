import type {FilmsUseCases, FilmsListUseCaseInput, FilmsDescribeUseCaseInput, FilmsListUseCaseOutput } from "../../application";
import type { Film } from '../../types';
import {provideFilmsUseCases} from "../../graph";

export type FilmsInputAdapterListInput = FilmsListUseCaseInput;
export type FilmsInputAdapterListOutput = FilmsListUseCaseOutput<Film>;
export type FilmsInputAdapterDescribeInput = FilmsDescribeUseCaseInput;

export interface FilmsInputAdapter {
    list(input: FilmsInputAdapterListInput): Promise<FilmsInputAdapterListOutput>;
    describe(input: FilmsInputAdapterDescribeInput): Promise<Film>;
}

export class DefaultFilmsInputAdapter implements FilmsInputAdapter {
    constructor(private readonly useCases: FilmsUseCases) {}

    describe(input: FilmsInputAdapterDescribeInput): Promise<Film> {
        return this.useCases.describe(input);
    }

    list(input: FilmsInputAdapterListInput): Promise<FilmsInputAdapterListOutput> {
        return this.useCases.list(input);
    }
}

export const provideFilmsInputAdapter = (): FilmsInputAdapter =>
    new DefaultFilmsInputAdapter(provideFilmsUseCases());
