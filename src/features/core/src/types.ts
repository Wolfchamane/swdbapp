export interface SWDBAppConfiguration {
	apiHostname: string;
}

export type AppWindow = Window & typeof globalThis & { swdbapp: SWDBAppConfiguration };
