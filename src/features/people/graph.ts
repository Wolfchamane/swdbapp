import { API_TYPES, provideAPIConfiguration } from '@swdbapp/core';
import { DefaultPeopleHttpClient, type PeopleHttpClient } from '@swdbapp/infra-http-swapi';
import { DefaultPeopleInputAdapter, PeopleHttpAdapter, type PeopleInputAdapter } from './adapters';
import { DefaultPeopleUseCases, type PeoplePorts, type PeopleUseCases } from './application';

const httpClient: PeopleHttpClient = new DefaultPeopleHttpClient(provideAPIConfiguration(API_TYPES.SWAPI));
const httpAdapter: PeoplePorts = new PeopleHttpAdapter(httpClient);

export const providePeopleUseCases = (): PeopleUseCases => new DefaultPeopleUseCases(httpAdapter);

export const providePeopleInputAdapter = (): PeopleInputAdapter =>
	new DefaultPeopleInputAdapter(providePeopleUseCases());
