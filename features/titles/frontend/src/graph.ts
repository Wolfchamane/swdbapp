import { provideAPIConfig } from '@swdbapp/core-feature';
import { DefaultTitlesHttpClient, type TitlesHttpClient } from '@swdbapp/infra-http';
import { TitlesHttpAdapter } from './adapters/output/titles.http-adapter';
import { DefaultTitleUseCases, type TitlesPorts, TitlesUseCases } from './application';

const httpClient: TitlesHttpClient = new DefaultTitlesHttpClient(provideAPIConfig());
const httpAdapter: TitlesPorts = new TitlesHttpAdapter(httpClient);

let titlesUseCasesSingleton: TitlesUseCases | undefined;

export const provideTitlesUseCases = (): TitlesUseCases => {
	titlesUseCasesSingleton = titlesUseCasesSingleton || new DefaultTitleUseCases(httpAdapter);

	return titlesUseCasesSingleton;
};
