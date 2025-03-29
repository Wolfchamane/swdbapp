import { type FilmsHttpClient, DefaultFilmsHttpClient } from '@swdbapp/infra-http-swapi';
import { provideAPIConfiguration, API_TYPES } from '@swdbapp/core';
import { type FilmsInputAdapter, DefaultFilmsInputAdapter } from "./adapters/input/films.input-adapter";
import { FilmsHttpAdapter } from "./adapters/output/films.http-adapter";
import { type FilmsPorts, type FilmsUseCases, DefaultFilmUseCases } from "./application";

const httpClient: FilmsHttpClient = new DefaultFilmsHttpClient(provideAPIConfiguration(API_TYPES.SWAPI));
const httpAdapter: FilmsPorts = new FilmsHttpAdapter(httpClient);

export const provideFilmsUseCases = (): FilmsUseCases =>
    new DefaultFilmUseCases(httpAdapter);
