export interface SWDBAppConfiguration {
	apiHostname: string;
    apiProtocol: string;
    apiPort: string;
}

export type AppWindow = Window & typeof globalThis & { swdbapp: SWDBAppConfiguration };

export interface APIConfiguration {
    hostname: string;
    secure: boolean;
    port?: number;
}
