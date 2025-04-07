import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';

export const ERA_ROUTE = {
	name: 'eras-view',
	path: '/eras',
	// @ts-expect-error import
	component: async () => await import('@/views/eras-view.vue'),
	meta: {
		icon: faGalacticRepublic,
	},
};

export const ERA_DETAILS_ROUTE = {
	name: 'era-details-view',
	path: '/eras/:id',
	// @ts-expect-error import
	component: async () => await import('@/views/era-details/era-details-view.vue'),
};
