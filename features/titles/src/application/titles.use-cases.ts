import type {TitleDetailPortInput, TitlesListPortInput, TitlesPorts} from './titles.ports';
import type { Nullable } from '@swdbapp/types';
import type { Title, TitleDetails } from '../types';

export type TitlesListAllUseCaseInput = TitlesListPortInput;
export type TitleDetailUseCaseInput = TitleDetailPortInput;

export interface TitlesUseCases {
    error: Nullable<Error>;
    pagination: {
        offset: number;
        limit: number;
        total: number;
    };
    titles: Title[];
    titleDetail: Nullable<TitleDetails>;
    listAll(input?: TitlesListAllUseCaseInput): Promise<void>;
    detail(input: TitleDetailUseCaseInput): Promise<void>;
}

export class DefaultTitleUseCases
    implements TitlesUseCases {

    error: Nullable<Error> = null;
    pagination: { offset: number; limit: number; total: number };
    titleDetail: Nullable<TitleDetails> = null;
    titles: Title[] = [];

    constructor(private readonly ports: TitlesPorts) {}

    private _reset(): void {
        this.error = null;
        this.pagination = { offset: 0, limit: 0, total: 0 };
        this.titleDetail = null;
        this.titles = [];
    }

    async detail(input: TitleDetailUseCaseInput): Promise<void> {
        try {
            this._reset();
            this.titleDetail = await this.ports.detail(input);
        } catch (e: unknown) {
            this.error = e as Error;
        }
    }

    async listAll(input?: TitlesListAllUseCaseInput): Promise<void> {
        try {
            this._reset();
            const { offset, limit, total, items } = await this.ports.list(input);
            this.pagination = { offset, limit, total };
            this.titles = items;
        } catch (e: unknown) {
            this.error = e as Error;
        }
    }
}
