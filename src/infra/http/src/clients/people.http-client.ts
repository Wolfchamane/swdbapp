import { JSONAdapter, type XHRConfiguration, XHR_FETCH_METHODS } from '@amjs/js-utils';
import type { People } from '../models';

export interface PeopleDescribeInput {
	id: string;
}

export interface PeopleListInput {
	search?: string;
	page?: number;
}

export interface PeopleListOutput {
	count: number;
	next: string;
	previous: string;
	results: People[];
}

export interface PeopleHttpClient {
	list(input: PeopleListInput): Promise<PeopleListOutput | Error>;
	describe(input: PeopleDescribeInput): Promise<People | Error>;
}

export class DefaultPeopleHttpClient extends JSONAdapter implements PeopleHttpClient {
	private readonly path: string = '/people';

	constructor(config: XHRConfiguration) {
		super({
			...config,
			hostname: 'swapi.dev/api',
		});
	}

	list(params: PeopleListInput): Promise<PeopleListOutput | Error> {
		return this.fetch<PeopleListOutput>(this.path, {
			method: XHR_FETCH_METHODS.GET,
            secure: true,
			params,
		});
	}

	describe(params: PeopleDescribeInput): Promise<People | Error> {
		return this.fetch<People>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
            secure: true,
			params,
		});
	}
}
