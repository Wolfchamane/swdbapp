import type { Character } from '../types';

export interface CharactersListPortInput {
	page?: number;
	limit?: number;
}

export interface CharactersListPortOutput<T> {
	page: number;
	limit: number;
	total: number;
	items: T[];
}

export interface CharactersPorts {
	list(input: CharactersListPortInput): Promise<CharactersListPortOutput<Character>>;
}
