import type { AppWindow, SWDBAppConfiguration } from './types';

export const provideAssetsDir = (): string => {
	const appConfig: SWDBAppConfiguration = (window as AppWindow).swdbapp;

	return appConfig.assetsDir;
};
