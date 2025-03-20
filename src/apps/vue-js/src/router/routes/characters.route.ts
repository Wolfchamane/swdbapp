export default {
	name: 'characters-view',
	path: '/characters',
	component: async () => await import('@swdbapp/characters/adapters/views/vue-js/characters-view.vue'),
};
