import { JSONAdapter, type XHRConfiguration, XHR_FETCH_METHODS } from '@amjs/js-utils';
import type { Film, ListOutput } from '../models';

export interface FilmsDescribeInput {
	id: string;
}

export interface FilmsListInput {
	search?: string;
	page?: number;
}

export interface FilmsHttpClient {
	list(input: FilmsListInput): Promise<ListOutput<Film> | Error>;
	describe(input: FilmsDescribeInput): Promise<Film | Error>;
}

export class DefaultFilmsHttpClient extends JSONAdapter implements FilmsHttpClient {
	private readonly path: string = '/films';

	constructor(config?: XHRConfiguration) {
		super({
			...(config || {}),
			hostname: 'swapi.dev/api',
		});
	}

	list(params: FilmsListInput): Promise<ListOutput<Film> | Error> {
		return this.fetch<ListOutput<Film>>(this.path, {
			method: XHR_FETCH_METHODS.GET,
			secure: true,
			params,
		});
	}

	describe(params: FilmsDescribeInput): Promise<Film | Error> {
		return this.fetch<Film>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
			secure: true,
			params,
		});
	}
}
