import { provideAPIConfiguration, API_TYPES } from '@swdbapp/core';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from '@swdbapp/infra-http-starwars-databank';
import { CharactersHttpAdapter } from './adapters/output/characters.http-adapter';
import { type CharactersPorts, type CharactersUseCases, DefaultCharactersUseCases } from './application';
import { type PeopleHttpClient, DefaultPeopleHttpClient } from '@swdbapp/infra-http-swapi';

const swAPIConfig = provideAPIConfiguration(API_TYPES.SWAPI);
const dataBankAPIConfig = provideAPIConfiguration(API_TYPES.DATABANK);

console.log(swAPIConfig, dataBankAPIConfig);

const peopleHttpClient: PeopleHttpClient = new DefaultPeopleHttpClient(swAPIConfig);
const charactersHttpClient: CharactersHttpClient = new DefaultCharactersHttpClient(dataBankAPIConfig);
const httpAdapter: CharactersPorts = new CharactersHttpAdapter(charactersHttpClient, peopleHttpClient);

let charactersUseCasesSingleton: CharactersUseCases | undefined;

export const provideCharactersUseCases = (): CharactersUseCases => {
	charactersUseCasesSingleton = charactersUseCasesSingleton || new DefaultCharactersUseCases(httpAdapter);

	return charactersUseCasesSingleton;
};
