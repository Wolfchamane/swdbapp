export default {
	name: 'character-details',
	path: '/characters/:id',
	component: async () => await import('@swdbapp/characters/adapters/views/vue-js/character-details-view.vue'),
};
