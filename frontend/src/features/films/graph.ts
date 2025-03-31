import { API_TYPES, provideAPIConfiguration } from '@swdbapp/core';
import { DefaultFilmsHttpClient, type FilmsHttpClient } from '@swdbapp/infra-http-swapi';
import { DefaultFilmsInputAdapter, type FilmsInputAdapter } from './adapters/input/films.input-adapter';
import { FilmsHttpAdapter } from './adapters/output/films.http-adapter';
import { DefaultFilmUseCases, type FilmsPorts, type FilmsUseCases } from './application';

const httpClient: FilmsHttpClient = new DefaultFilmsHttpClient(provideAPIConfiguration(API_TYPES.SWAPI));
const httpAdapter: FilmsPorts = new FilmsHttpAdapter(httpClient);

export const provideFilmsUseCases = (): FilmsUseCases => new DefaultFilmUseCases(httpAdapter);
