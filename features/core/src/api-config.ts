export interface APIHeadersConfig {
    'X-API-KEY': string;
}

export interface APIConfig {
    hostname: string;
    port: string;
    secure: boolean;
    headers: APIHeadersConfig;
}

export const provideAPIHostname = (): string => window.swDBAppConfig.hostname;

export const provideAPIPort = (): string => window.swDBAppConfig.port;

export const provideAPISecure = (): boolean => window.swDBAppConfig.secure;

export const provideAPIHeaders = (): APIHeadersConfig => window.swDBAppConfig.headers;

export const provideAPIConfig = (): APIConfig => ({
    hostname: provideAPIHostname(),
    port: provideAPIPort(),
    secure: provideAPISecure(),
    headers: provideAPIHeaders(),
});
