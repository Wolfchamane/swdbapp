import { faOldRepublic } from '@fortawesome/free-brands-svg-icons';
import { type ListInput } from '@swdbapp/infra-http';
import { type Title } from '../../types';

export type TitlesListViewQuery = ListInput<Title>;

export const VUE_TITLES_ROUTE = {
	name: 'titles-view',
	path: '/titles',
	component: async () => await import('../../adapters/view/vue-js/titles-list/titles-list-view.vue'),
	meta: {
		icon: faOldRepublic,
		query: {
			offset: 0,
		} as TitlesListViewQuery,
	},
};

export const VUE_TITLE_DETAILS_ROUTE = {
	name: 'title-details-view',
	path: '/titles/:id',
	component: async () => await import('../../adapters/view/vue-js/title-details/title-details-view.vue'),
};
