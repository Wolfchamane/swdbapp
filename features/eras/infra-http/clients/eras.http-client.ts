import { BaseHttpClient, type ListInput, type ListOutput, type DescribeInput } from '@swdbapp/types';
import type { EraModel } from '../models/era.model';
import { XHR_FETCH_METHODS } from '@amjs/js-utils';
import { provideAPIHeaders } from '@swdbapp/core-feature';

export interface ErasHttpClient {
	list(input?: ListInput<EraModel>): Promise<ListOutput<EraModel> | Error>;
	describe(params: DescribeInput): Promise<EraModel | Error>;
}

export class DefaultErasHttpClient extends BaseHttpClient implements ErasHttpClient {
	private readonly path = '/api/eras';

	/**
	 * @override
	 */
	protected _serialize(
		headers?: Record<string, string>,
		body?: object | number | string | boolean | null
	): Promise<void | Error> {
		return super._serialize(
			{
				...(headers || {}),
				...provideAPIHeaders(),
			},
			body
		);
	}

	list(params?: ListInput<EraModel>): Promise<ListOutput<EraModel> | Error> {
		return this.fetch<ListOutput<EraModel>>(this.path, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}

	describe(params: DescribeInput): Promise<EraModel | Error> {
		return this.fetch<EraModel>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}
}
