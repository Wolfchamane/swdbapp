import { type TitlesHttpClient, DefaultTitlesHttpClient } from '@swdbapp/infra-http';
import { TitlesHttpAdapter } from "./adapters/output/titles.http-adapter";
import { type TitlesPorts, TitlesUseCases, DefaultTitleUseCases } from "./application";
import {provideAPIConfig} from '@swdbapp/core-feature';

const httpClient: TitlesHttpClient = new DefaultTitlesHttpClient(provideAPIConfig());
const httpAdapter: TitlesPorts = new TitlesHttpAdapter(httpClient);

let titlesUseCasesSingleton: TitlesUseCases | undefined;

export const provideTitlesUseCases = (): TitlesUseCases => {
    titlesUseCasesSingleton = titlesUseCasesSingleton || new DefaultTitleUseCases(httpAdapter);

    return titlesUseCasesSingleton;
};
