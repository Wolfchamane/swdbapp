import { BaseHttpClient } from './common';
import type { EraModel } from '../models';
import type { ListInput, ListOutput, DescribeInput } from '../types';
import { XHR_FETCH_METHODS } from '@amjs/js-utils';

export interface ErasHttpClient {
	list(input?: ListInput<EraModel>): Promise<ListOutput<EraModel> | Error>;
	describe(params: DescribeInput): Promise<EraModel | Error>;
}

export class DefaultErasHttpClient extends BaseHttpClient implements ErasHttpClient {
	private readonly path = '/api/eras';

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
