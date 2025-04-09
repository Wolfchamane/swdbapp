import { BaseHttpClient } from './common';
import type { TitleModel } from '../models';
import type { ListInput, ListOutput, DescribeInput } from '../types';
import { XHR_FETCH_METHODS } from '@amjs/js-utils';

export interface TitlesHttpClient {
	list(input?: ListInput<TitleModel>): Promise<ListOutput<TitleModel> | Error>;
	describe(params: DescribeInput): Promise<TitleModel | Error>;
}

export class DefaultTitlesHttpClient extends BaseHttpClient implements TitlesHttpClient {
	private readonly path = '/api/titles';

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
