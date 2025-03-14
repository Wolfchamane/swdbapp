export default {
	name: 'people-view',
	path: '/people',
	component: async () => await import('@swdbapp/feature-people/adapters/views/vue-js/people-view.vue'),
};
