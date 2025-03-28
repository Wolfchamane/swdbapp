import { XHR_FETCH_METHODS } from '@amjs/js-utils';
import { BaseHttpClient } from '../../../shared/src';
import type { PeopleModel } from '../models';
import type { ListInput, ListOutput } from '../types';

export type PeopleListOutput = ListOutput<PeopleModel>;

export type PeopleListInput = ListInput;

export interface PeopleDescribeInput {
	id: string;
}

export interface PeopleHttpClient {
	list(input?: PeopleListInput): Promise<PeopleListOutput | Error>;
	describe(input: PeopleDescribeInput): Promise<PeopleModel | Error>;
}

export class DefaultPeopleHttpClient extends BaseHttpClient implements PeopleHttpClient {
	private readonly path: string = '/people';

	async list(params?: PeopleListInput): Promise<PeopleListOutput | Error> {
		return this.fetch<ListOutput<PeopleModel>>(`${this.path}`, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}

	async describe(params: PeopleDescribeInput): Promise<PeopleModel | Error> {
		return this.fetch<PeopleModel>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}
}
