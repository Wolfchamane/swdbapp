import { faOldRepublic } from '@fortawesome/free-brands-svg-icons';
import { type ListInput } from '@swdbapp/infra-http';
import { type Title } from '@swdbapp/titles-feature';

export type TitlesListViewQuery = ListInput<Title>;

export const TITLES_ROUTE = {
	name: 'titles-view',
	path: '/titles',
	// @ts-expect-error import
	component: async () => await import('@/views/titles-list/titles-list-view.vue'),
	meta: {
		icon: faOldRepublic,
		query: {
			offset: 0,
		} as TitlesListViewQuery,
	},
};

export const TITLE_DETAILS_ROUTE = {
	name: 'title-details-view',
	path: '/titles/:id',
	// @ts-expect-error import
	component: async () => await import('@/views/title-details/title-details-view.vue'),
};
