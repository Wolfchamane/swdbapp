import { XHR_FETCH_METHODS } from '@amjs/js-utils';
import { BaseHttpClient } from '../../../shared/src';
import type { FilmModel } from '../models';
import type { ListInput, ListOutput } from '../types';

export type FilmsListOutput = ListOutput<FilmModel>;

export type FilmsListInput = ListInput;

export interface FilmsDescribeInput {
	id: string;
}

export interface FilmsHttpClient {
	list(input?: FilmsListInput): Promise<FilmsListOutput | Error>;
	describe(input: FilmsDescribeInput): Promise<FilmModel | Error>;
}

export class DefaultFilmsHttpClient extends BaseHttpClient implements FilmsHttpClient {
	private readonly path: string = '/films';

	async list(params?: FilmsListInput): Promise<FilmsListOutput | Error> {
		return this.fetch<ListOutput<FilmModel>>(`${this.path}`, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}

	describe(params: FilmsDescribeInput): Promise<FilmModel | Error> {
		return this.fetch<FilmModel>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}
}
