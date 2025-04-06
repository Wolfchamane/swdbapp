import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';

export default {
	name: 'eras-view',
	path: '/eras',
    // @ts-ignore
	component: async () => await import('@/views/eras-view.vue'),
	meta: {
		icon: faGalacticRepublic,
	},
};
