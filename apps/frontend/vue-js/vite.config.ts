import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import svg from 'vite-svg-loader';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const envDir: string = path.resolve(__dirname, '..', '..', '..', 'environments');

const publicDir: string = path.resolve(__dirname, '..', '..', 'assets');

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const isPro: boolean = /^pro/g.test(mode);
	return {
		base: isPro ? '/software/swdbapp/vue-js' : './',
		plugins: [vue(), vueDevTools(), svg()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		envDir,
		publicDir: isPro ? false : publicDir,
		build: {
			outDir: '/dist',
			emptyOutDir: true,
		},
	};
});
