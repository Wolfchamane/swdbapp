import type { Character } from '../types';
import type { CharactersPorts } from './characters.ports';

export interface CharactersListUseCaseInput {
	page?: number;
	limit?: number;
}

export interface CharactersListUseCaseOutput<T> {
	page: number;
	limit: number;
	total: number;
	items: T[];
}

export interface CharactersUseCases {
	list(input: CharactersListUseCaseInput): Promise<CharactersListUseCaseOutput<Character>>;
}

export class DefaultCharactersUseCases implements CharactersUseCases {
	constructor(private ports: CharactersPorts) {}

	async list(input: CharactersListUseCaseInput): Promise<CharactersListUseCaseOutput<Character>> {
		return this.ports.list(input);
	}
}
