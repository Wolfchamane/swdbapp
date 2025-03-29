export interface IndexAPIConfiguration {
	hostname: string;
	protocol: string;
	port: string;
}

export interface APIConfiguration {
	hostname: string;
	secure: boolean;
	port?: string;
}

export type APIType = 'databank' | 'swapi';
export const API_TYPES: Record<string, APIType> = Object.freeze({
	DATABANK: 'databank',
	SWAPI: 'swapi',
});

export interface SWDBAppConfiguration extends Record<APIType, IndexAPIConfiguration> {
    assetsDir: string;
	databank: IndexAPIConfiguration;
	swapi: IndexAPIConfiguration;
}

export type AppWindow = Window & typeof globalThis & { swdbapp: SWDBAppConfiguration };
