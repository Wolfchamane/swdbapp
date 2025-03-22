import {APIConfiguration, APIType, AppWindow, IndexAPIConfiguration, SWDBAppConfiguration} from './types';

export const provideAPIConfiguration = (type: APIType): APIConfiguration => {
	debugger;
    const appConfig: SWDBAppConfiguration = (window as AppWindow).swdbapp;
	const apiConfig: IndexAPIConfiguration = appConfig[type];
	if (!apiConfig) {
		throw new Error(`Cannot find API configuration for "${type}"`);
	}

	return {
        hostname: apiConfig.hostname,
        port: apiConfig.port,
        secure: apiConfig.protocol === 'https',
    };
};
