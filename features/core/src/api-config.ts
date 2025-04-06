import { SWDBAppConfig } from '@swdbapp/types';

export interface APIHeadersConfig {
	'X-API-KEY': string;
}

export interface APIConfig {
	hostname: string;
	port: string;
	secure: boolean;
	headers: APIHeadersConfig;
}

export const provideAPIHostname = (): string => (window as SWDBAppConfig).swDBAppConfig.hostname;

export const provideAPIPort = (): string => (window as SWDBAppConfig).swDBAppConfig.port;

export const provideAPISecure = (): boolean => (window as SWDBAppConfig).swDBAppConfig.secure;

export const provideAPIHeaders = (): APIHeadersConfig => (window as SWDBAppConfig).swDBAppConfig.headers;

export const provideAPIConfig = (): APIConfig => ({
	hostname: provideAPIHostname(),
	port: provideAPIPort(),
	secure: provideAPISecure(),
	headers: provideAPIHeaders(),
});
