import { ErasPorts, ErasListPortInput, ErasListPortOutput, ErasDescribePortInput } from './eras.ports';
import type { Era, EraDetails } from '../types';
import type { Nullable } from '@swdbapp/types';

export type ErasDetailUseCaseInput = ErasDescribePortInput;

export type ErasListAllUseCaseInput = ErasListPortInput;

export interface ErasUseCases {
	error: Nullable<Error>;
	pagination: {
		offset: number;
		limit: number;
		total: number;
	};
	eras: Era[];
	eraDetail: Nullable<EraDetails>;
	listAll(input?: ErasListAllUseCaseInput): Promise<void>;
	detail(input: ErasDetailUseCaseInput): Promise<void>;
}

export class DefaultErasUseCases implements ErasUseCases {
	error = null;
	pagination;
	eras = [];
	eraDetail = null;

	constructor(private readonly ports: ErasPorts) {
		this._reset();
	}

	private _reset(): void {
		this.error = null;
		this.pagination = {
			offset: 0,
			limit: 0,
			total: 0,
		};
		this.eras = [];
		this.eraDetail = null;
	}

	async listAll(input?: ErasListAllUseCaseInput): Promise<void> {
		try {
			this._reset();
			const { offset, limit, total, items }: ErasListPortOutput = await this.ports.list(input);
			this.pagination.offset = offset;
			this.pagination.limit = limit;
			this.pagination.total = total;
			this.eras = items;
		} catch (e: unknown) {
			this.error = e as Error;
		}
	}

	async detail(input: ErasDetailUseCaseInput): Promise<void> {
		try {
			this._reset();
			this.eraDetail = await this.ports.describe(input);
		} catch (e: unknown) {
			this.error = e as Error;
		}
	}
}
