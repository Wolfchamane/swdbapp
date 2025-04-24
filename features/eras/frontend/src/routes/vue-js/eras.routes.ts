import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';

export const VUE_ERAS_ROUTE = {
	name: 'eras-view',
	path: '/eras',
	component: async () => await import('../../adapters/views/vue-js/eras-list/eras-view.vue'),
	meta: {
		icon: faGalacticRepublic,
	},
};

export const VUE_ERA_DETAILS_ROUTE = {
	name: 'era-details-view',
	path: '/eras/:id',
	component: async () => await import('../../adapters/views/vue-js/era-details/era-details-view.vue'),
};
