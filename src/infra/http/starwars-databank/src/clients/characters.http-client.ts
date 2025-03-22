import { XHR_FETCH_METHODS } from '@amjs/js-utils';
import { BaseHttpClient } from '../../../shared/src';
import type { CharacterModel } from '../models';
import type { ListInput, ListOutput } from '../types';

export interface CharactersDescribeInput {
	id: string;
}

export type CharactersListOutput = ListOutput<CharacterModel>;

export type CharactersListInput = ListInput;

export interface CharactersHttpClient {
	list(input: CharactersListInput): Promise<CharactersListOutput | Error>;
	describe(input: CharactersDescribeInput): Promise<CharacterModel | Error>;
}

export class DefaultCharactersHttpClient extends BaseHttpClient implements CharactersHttpClient {
	private readonly path: string = '/characters';

	list(params: CharactersListInput): Promise<CharactersListOutput | Error> {
		return this.fetch<ListOutput<CharacterModel>>(this.path, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}

	describe(params: CharactersDescribeInput): Promise<CharacterModel | Error> {
		return this.fetch<CharacterModel>(`${this.path}/{id}`, {
			method: XHR_FETCH_METHODS.GET,
			params,
		});
	}
}
