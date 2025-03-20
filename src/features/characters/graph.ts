import { provideAPIConfiguration } from '@swdbapp/core';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from '@swdbapp/infra-http';
import { CharactersHttpAdapter } from './adapters/output/characters.http-adapter';
import { type CharactersPorts, type CharactersUseCases, DefaultCharactersUseCases } from './application';

const httpClient: CharactersHttpClient = new DefaultCharactersHttpClient(provideAPIConfiguration());
const httpAdapter: CharactersPorts = new CharactersHttpAdapter(httpClient);

let charactersUseCasesSingleton: CharactersUseCases | undefined;

export const provideCharactersUseCases = (): CharactersUseCases => {
	charactersUseCasesSingleton = charactersUseCasesSingleton || new DefaultCharactersUseCases(httpAdapter);

	return charactersUseCasesSingleton;
};
