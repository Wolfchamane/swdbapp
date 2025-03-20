import type { AppWindow, SWDBAppConfiguration } from './types';

export const provideAPIHostname = (): string => {
	const w: AppWindow = window as AppWindow;

	return w && 'swdbapp' in w ? (w.swdbapp as SWDBAppConfiguration).apiHostname : '';
};
