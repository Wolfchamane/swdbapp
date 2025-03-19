import {
	DefaultFilmsHttpClient,
	DefaultPeopleHttpClient,
	type FilmsHttpClient,
	type PeopleHttpClient,
} from '@swdbapp/infra-http';
import { PeopleHttpAdapter } from './adapters/output';
import { DefaultPeopleUseCases, type PeoplePorts, PeopleUseCases } from './application';

const peopleHttpClient: PeopleHttpClient = new DefaultPeopleHttpClient();
const filmsHttpClient: FilmsHttpClient = new DefaultFilmsHttpClient();
const peopleHttpAdapter: PeoplePorts = new PeopleHttpAdapter(peopleHttpClient, filmsHttpClient);

let peopleUseCaseSingleton: PeopleUseCases | undefined;

export const providePeopleUseCases = (): PeopleUseCases => {
	peopleUseCaseSingleton = peopleUseCaseSingleton || new DefaultPeopleUseCases(peopleHttpAdapter);

	return peopleUseCaseSingleton;
};
