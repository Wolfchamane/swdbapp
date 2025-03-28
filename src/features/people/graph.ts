import { type PeopleHttpClient, DefaultPeopleHttpClient } from '@swdbapp/infra-http-swapi';
import { provideAPIConfiguration, API_TYPES } from '@swdbapp/core';
import { type PeoplePorts, type PeopleUseCases, DefaultPeopleUseCases } from './application';
import {type PeopleInputAdapter, DefaultPeopleInputAdapter, PeopleHttpAdapter } from "./adapters";

const httpClient: PeopleHttpClient = new DefaultPeopleHttpClient(provideAPIConfiguration(API_TYPES.SWAPI));
const httpAdapter: PeoplePorts = new PeopleHttpAdapter(httpClient);

export const providePeopleUseCases = (): PeopleUseCases =>
    new DefaultPeopleUseCases(httpAdapter);

export const providePeopleInputAdapter = (): PeopleInputAdapter =>
    new DefaultPeopleInputAdapter(providePeopleUseCases());
