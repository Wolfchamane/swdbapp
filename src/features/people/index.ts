import {
	DefaultFilmsHttpClient,
	DefaultPeopleHttpClient,
	type FilmsHttpClient,
	type PeopleHttpClient,
} from '@swdbapp/infra-http';
import { PeopleHttpAdapter } from './adapters';
import { DefaultPeopleUseCases, type PeoplePorts, PeopleUseCases } from './application';

const peopleHttpClient: PeopleHttpClient = new DefaultPeopleHttpClient();
const filmsHttpClient: FilmsHttpClient = new DefaultFilmsHttpClient();
const peopleHttpAdapter: PeoplePorts = new PeopleHttpAdapter(peopleHttpClient, filmsHttpClient);

export const providePeopleUseCases = (): PeopleUseCases => new DefaultPeopleUseCases(peopleHttpAdapter);
