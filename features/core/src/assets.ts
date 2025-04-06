import { SWDBAppConfig } from '@swdbapp/types';

export const provideAssetsPath = (): string => (window as SWDBAppConfig).swDBAppConfig.assetsPath;

export const provideAssetURL = (asset: string): URL => {
	return new URL([provideAssetsPath(), asset].join('/'), window.origin);
};
