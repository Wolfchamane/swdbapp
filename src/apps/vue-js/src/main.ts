import { createApp } from 'vue';
import '../../../styles/main.sass';
import AppWrapper from '@/components/app-wrapper.vue';
import router from '@/router';

window.addEventListener('DOMContentLoaded', () => {
	const app = createApp(AppWrapper);
    app.use(router);
	app.mount('#app');
});
