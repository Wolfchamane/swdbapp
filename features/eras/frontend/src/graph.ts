import { provideAPIHostname, provideAPIPort, provideAPISecure } from '@swdbapp/core-feature';
import { DefaultErasHttpClient, type ErasHttpClient } from '@swdbapp/infra-http';
import { ErasHttpAdapter } from './adapters/output/eras.http-adapter';
import { DefaultErasUseCases, type ErasPorts, type ErasUseCases } from './application';

const hostname: string = provideAPIHostname();
const port: string = provideAPIPort();
const secure: boolean = provideAPISecure();

const httpClient: ErasHttpClient = new DefaultErasHttpClient({ hostname, port, secure });
const httpAdapter: ErasPorts = new ErasHttpAdapter(httpClient);

let erasSingleton: ErasUseCases | undefined;

export const provideErasUseCases = (): ErasUseCases => {
	erasSingleton = erasSingleton || new DefaultErasUseCases(httpAdapter);

	return erasSingleton;
};
