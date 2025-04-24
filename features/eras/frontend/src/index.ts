import type { ErasUseCases, ErasListAllUseCaseInput } from './application';
import { VUE_ERAS_ROUTE, VUE_ERA_DETAILS_ROUTE } from './routes/vue-js/eras.routes';

export { ErasUseCases, ErasListAllUseCaseInput };
export * from './types';

export type AppKind = 'vue-js' | 'react-js' | 'wc';

interface RoutesMap {
	ERAS_ROUTE: object | never;
	ERA_DETAILS_ROUTE: object | never;
}

interface AppRoutesMap {
	'vue-js': RoutesMap | null;
	'react-js': RoutesMap | null;
	wc: RoutesMap | null;
}

const appRoutesMap: AppRoutesMap = {
	'vue-js': {
		ERAS_ROUTE: VUE_ERAS_ROUTE,
		ERA_DETAILS_ROUTE: VUE_ERA_DETAILS_ROUTE,
	} satisfies RoutesMap,
	'react-js': null,
	wc: null,
};

export const provideAppRoutes = (kind: AppKind): RoutesMap => {
	return appRoutesMap[kind];
};
