import type { AppWindow, SWDBAppConfiguration, APIConfiguration } from './types';

export const provideAPIHostname = (): string => {
	const w: AppWindow = window as AppWindow;

	return w && 'swdbapp' in w ? (w.swdbapp as SWDBAppConfiguration).apiHostname : '';
};

export const isAPISecureProtocol = (): boolean => {
    const w: AppWindow = window as AppWindow;

    return w && 'swdbapp' in w ? (w.swdbapp as SWDBAppConfiguration).apiProtocol === 'https' : false;
};

export const provideAPIPort = (): string => {
    const w: AppWindow = window as AppWindow;

    return w && 'swdbapp' in w ? (w.swdbapp as SWDBAppConfiguration).apiPort : '';
};

export const provideAPIConfiguration = (): APIConfiguration => {
    let port: string | number | undefined = provideAPIPort();
    if (port !== undefined) {
        port = Number(port)
    }

    return {
        hostname: provideAPIHostname(),
        secure: isAPISecureProtocol(),
        port,
    }
};
