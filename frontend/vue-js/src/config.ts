import { SWDBAppConfig } from '@swdbapp/types';

export const setWindowConfiguration = (): void => {
	const w = window as SWDBAppConfig;
	if (w) {
        // @ts-ignore
        const { VITE_API_HOST, VITE_API_PORT, VITE_API_PROTOCOL, VITE_API_KEY, VITE_ASSETS_PATH } = import.meta.env;
		w.swDBAppConfig = Object.freeze({
            assetsPath: VITE_ASSETS_PATH,
            hostname: VITE_API_HOST,
            port: VITE_API_PORT,
            secure: VITE_API_PROTOCOL === 'https',
			headers: {
				'X-API-KEY': VITE_API_KEY,
			},
		});
	}
};
