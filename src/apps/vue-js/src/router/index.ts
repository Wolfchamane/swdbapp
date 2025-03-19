import { createRouter, createWebHashHistory, isNavigationFailure } from 'vue-router';
import routes from './routes';

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.afterEach((to, from, failure) => {
	if (isNavigationFailure(failure)) {
		console.error('oh oh');
		console.log(failure);
	}
});

export default router;
