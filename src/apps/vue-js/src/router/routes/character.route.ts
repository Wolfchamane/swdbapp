export default {
	name: 'character-view',
	path: '/people/:id',
	component: async () => await import('@swdbapp/feature-people/adapters/views/vue-js/character-view.vue'),
};
