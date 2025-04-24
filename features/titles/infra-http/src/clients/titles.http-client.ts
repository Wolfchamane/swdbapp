import { BaseHttpClient, type ListInput, type ListOutput, type DescribeInput } from '@swdbapp/types';
import type { TitleModel } from '../models/title.model';
import { XHR_FETCH_METHODS } from '@amjs/js-utils';
import { provideAPIHeaders } from '@swdbapp/core-feature';

export interface TitlesHttpClient {
	list(input?: ListInput<TitleModel>): Promise<ListOutput<TitleModel> | Error>;
	describe(params: DescribeInput): Promise<TitleModel | Error>;
}

export class DefaultTitlesHttpClient extends BaseHttpClient implements TitlesHttpClient {
	private readonly path = '/api/titles';

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

	list(params?: ListInput<TitleModel>): Promise<ListOutput<TitleModel> | Error> {
		return this.fetch<ListOutput<TitleModel>>(this.path, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}

	describe(params: DescribeInput): Promise<TitleModel | Error> {
		return this.fetch<TitleModel>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}
}
