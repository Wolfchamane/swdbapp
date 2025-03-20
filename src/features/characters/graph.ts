import { provideAPIHostname } from '@swdbapp/core';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from '@swdbapp/infra-http';
import { CharactersHttpAdapter } from './adapters/output/characters.http-adapter';
import { type CharactersPorts, type CharactersUseCases, DefaultCharactersUseCases } from './application';

const hostname: string = provideAPIHostname();
const httpClient: CharactersHttpClient = new DefaultCharactersHttpClient({ hostname });
const httpAdapter: CharactersPorts = new CharactersHttpAdapter(httpClient);

let charactersUseCasesSingleton: CharactersUseCases | undefined;

export const provideCharactersUseCases = (): CharactersUseCases => {
	charactersUseCasesSingleton = charactersUseCasesSingleton || new DefaultCharactersUseCases(httpAdapter);

	return charactersUseCasesSingleton;
};
