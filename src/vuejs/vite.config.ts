import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import svg from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools(), svg()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
