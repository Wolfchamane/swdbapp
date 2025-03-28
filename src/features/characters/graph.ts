import { API_TYPES, provideAPIConfiguration } from '@swdbapp/core';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from '@swdbapp/infra-http-starwars-databank';
import { CharactersHttpAdapter } from './adapters/output/characters.http-adapter';
import { type CharactersPorts, type CharactersUseCases, DefaultCharactersUseCases } from './application';
import { providePeopleInputAdapter } from '@swdbapp/people';

const dataBankAPIConfig = provideAPIConfiguration(API_TYPES.DATABANK);

const charactersHttpClient: CharactersHttpClient = new DefaultCharactersHttpClient(dataBankAPIConfig);
const httpAdapter: CharactersPorts = new CharactersHttpAdapter(charactersHttpClient, providePeopleInputAdapter());

let charactersUseCasesSingleton: CharactersUseCases | undefined;

export const provideCharactersUseCases = (): CharactersUseCases => {
	charactersUseCasesSingleton = charactersUseCasesSingleton || new DefaultCharactersUseCases(httpAdapter);

	return charactersUseCasesSingleton;
};
