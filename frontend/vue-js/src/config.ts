type SWDBAppConfig = Window &
	typeof globalThis & {
		swDBAppConfig: {
			hostname: string;
			port: string;
			secure: boolean;
			headers: {
				['X-API-KEY']: string;
			};
		};
	};

export const setWindowConfiguration = (): void => {
	const w = window as SWDBAppConfig;
	if (w) {
		w.swDBAppConfig = {
			hostname: import.meta.env.VITE_API_HOST,
			port: import.meta.env.VITE_API_PORT,
			secure: import.meta.env.VITE_API_PROTOCOL === 'https',
			headers: {
				'X-API-KEY': import.meta.env.VITE_API_KEY,
			},
		};
		Object.freeze(w.swDBAppConfig);
	}
};
