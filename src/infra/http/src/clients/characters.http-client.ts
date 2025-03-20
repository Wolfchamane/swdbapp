import { XHR_FETCH_METHODS } from '@amjs/js-utils';
import type { CharacterModel } from '../models';
import type { ListInput, ListOutput } from '../types';
import { BaseHttpClient } from './base.http-client';

export interface CharactersDescribeInput {
	id: string;
}

export type CharactersListInput = ListInput;

export interface CharactersHttpClient {
	list(input: CharactersListInput): Promise<ListOutput<CharacterModel> | Error>;
	describe(input: CharactersDescribeInput): Promise<CharacterModel | Error>;
}

export class DefaultCharactersHttpClient extends BaseHttpClient implements CharactersHttpClient {
	private readonly path: string = '/characters';

	list(params: CharactersListInput): Promise<ListOutput<CharacterModel> | Error> {
		return this.fetch<ListOutput<CharacterModel>>(this.path, {
			method: XHR_FETCH_METHODS.GET,
			secure: false,
			params,
		});
	}

	describe(params: CharactersDescribeInput): Promise<CharacterModel | Error> {
		return this.fetch<CharacterModel>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
			secure: false,
			params,
		});
	}
}
