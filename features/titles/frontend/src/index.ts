import type { TitlesListAllUseCaseInput, TitlesUseCases } from './application';
import { VUE_TITLES_ROUTE, VUE_TITLE_DETAILS_ROUTE } from './routes/vue-js/titles.routes';

export { TitlesUseCases, TitlesListAllUseCaseInput };
export * from './types';

export type AppKind = 'vue-js' | 'react-js' | 'wc';

interface RoutesMap {
	TITLES_ROUTE: object | never;
	TITLE_DETAILS_ROUTE: object | never;
}

interface AppRoutesMap {
	'vue-js': RoutesMap | null;
	'react-js': RoutesMap | null;
	wc: RoutesMap | null;
}

const appRoutesMap: AppRoutesMap = {
	'vue-js': {
		TITLES_ROUTE: VUE_TITLES_ROUTE,
		TITLE_DETAILS_ROUTE: VUE_TITLE_DETAILS_ROUTE,
	} satisfies RoutesMap,
	'react-js': null,
	wc: null,
};

export const provideTitlesFrontendRoutes = (kind: AppKind): RoutesMap => {
	return appRoutesMap[kind];
};
