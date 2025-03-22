import { API_TYPES, provideAPIConfiguration } from '@swdbapp/core';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from '@swdbapp/infra-http-starwars-databank';
import { DefaultPeopleHttpClient, type PeopleHttpClient } from '@swdbapp/infra-http-swapi';
import { CharactersHttpAdapter } from './adapters/output/characters.http-adapter';
import { type CharactersPorts, type CharactersUseCases, DefaultCharactersUseCases } from './application';

const swAPIConfig = provideAPIConfiguration(API_TYPES.SWAPI);
const dataBankAPIConfig = provideAPIConfiguration(API_TYPES.DATABANK);

const peopleHttpClient: PeopleHttpClient = new DefaultPeopleHttpClient(swAPIConfig);
const charactersHttpClient: CharactersHttpClient = new DefaultCharactersHttpClient(dataBankAPIConfig);
const httpAdapter: CharactersPorts = new CharactersHttpAdapter(charactersHttpClient, peopleHttpClient);

let charactersUseCasesSingleton: CharactersUseCases | undefined;

export const provideCharactersUseCases = (): CharactersUseCases => {
	charactersUseCasesSingleton = charactersUseCasesSingleton || new DefaultCharactersUseCases(httpAdapter);

	return charactersUseCasesSingleton;
};
