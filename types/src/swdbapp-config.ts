export type SWDBAppConfig = Window &
	typeof globalThis & {
		swDBAppConfig: {
			assetsPath: string;
			hostname: string;
			port: string;
			secure: boolean;
			headers: {
				['X-API-KEY']: string;
			};
		};
	};
