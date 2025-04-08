export const HOME_ROUTE = {
	name: 'home-view',
	path: '/',
    // @ts-expect-error import
	component: async () => await import('@/views/home-view.vue'),
};
