import { type App, createApp } from 'vue';
import './styles/main.sass';
import { AppWrapper } from './components';
import { setWindowConfiguration } from './config';
import router from './router';

setWindowConfiguration();

window.addEventListener('DOMContentLoaded', () => {
	const app: App = createApp(AppWrapper);
	app.use(router);
	app.mount('#app');
});
