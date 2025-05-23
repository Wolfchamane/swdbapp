import { SWDBAppConfig } from '@swdbapp/types';

export const provideAssetsPath = (): string => (window as SWDBAppConfig).swDBAppConfig.assetsPath;

export const provideAssetURL = (asset: string): URL => {
	let url: URL;
	if (asset.startsWith('http')) {
		url = URL.parse(asset);
		if (!url) {
			throw new Error(`Could not parse as URL: "${asset}"`);
		}
	} else {
		url = new URL([provideAssetsPath(), asset].join('/'), window.origin);
	}

	return url;
};
