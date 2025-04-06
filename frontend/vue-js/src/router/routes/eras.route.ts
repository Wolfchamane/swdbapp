import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';

export const ERA_ROUTE = {
	name: 'eras-view',
	path: '/eras',
	component: async () => await import('@/views/eras-view.vue'),
	meta: {
		menuItem: true,
		icon: faGalacticRepublic,
	},
};

export const ERA_DETAILS_ROUTE = {
	name: 'era-details-view',
	path: '/eras/:id',
	component: async () => await import('@/views/era-details-view.vue'),
};
