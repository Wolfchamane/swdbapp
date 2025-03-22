import { XHR_FETCH_METHODS } from '@amjs/js-utils';
import { BaseHttpClient } from '../../../shared/src';
import type { PeopleModel } from '../models';
import type { ListInput, ListOutput } from '../types';

export type PeopleListOutput = ListOutput<PeopleModel>;

export type PeopleListInput = ListInput;

export interface PeopleHttpClient {
	list(input?: PeopleListInput): Promise<PeopleListOutput | Error>;
}

export class DefaultPeopleHttpClient extends BaseHttpClient implements PeopleHttpClient {
	private readonly path: string = '/people';

	async list(input?: PeopleListInput): Promise<PeopleListOutput | Error> {
		return this.fetch<ListOutput<PeopleModel>>(`${this.path}`, {
			method: XHR_FETCH_METHODS.GET,
			params: input,
		});
	}
}
