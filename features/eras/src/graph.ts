import { type ErasHttpClient, DefaultErasHttpClient } from '@swdbapp/infra-http';
import { ErasHttpAdapter } from "./adapters/output/eras.http-adapter";
import { provideAPIHostname, provideAPIPort, provideAPISecure } from '@swdbapp/core-feature';
import { type ErasPorts, type ErasUseCases, DefaultErasUseCases } from './application';

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

