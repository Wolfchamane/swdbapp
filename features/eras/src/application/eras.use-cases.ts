import type { ErasPorts, ErasListPortInput, ErasListPortOutput } from './eras.ports';
import type { Era } from '../types';

type ErasListAllUseCaseInput = ErasListPortInput;

export interface ErasUseCases {
    error?: Error;
    pagination: {
        offset: number;
        limit: number;
        total: number;
    },
    eras: Era[];
    listAll(input?: ErasListAllUseCaseInput): Promise<void>;
}

export class DefaultErasUseCases
    implements ErasUseCases {

    error: Error | undefined;
    pagination;
    eras: Era[];

    constructor(private readonly ports: ErasPorts) {
        this.pagination = {
            offset: 0,
            limit: 0,
            total: 0,
        };

        this.eras = [];
    }

    async listAll(input?: ErasListAllUseCaseInput): Promise<void> {
        try {
            this.error = undefined;
            const { offset, limit, total, items }: ErasListPortOutput = await this.ports.list(input);
            this.pagination.offset = offset;
            this.pagination.limit = limit;
            this.pagination.total = total;
            this.eras = items;
        } catch (e: unknown) {
            this.error = e as Error;
        }
    }
}
