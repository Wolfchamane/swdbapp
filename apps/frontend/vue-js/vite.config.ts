import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import svg from 'vite-svg-loader';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const envDir: string = path.resolve(__dirname, '..', '..', '..', '.env');
const publicDir: string = path.resolve(__dirname, '..', '..', 'assets');
const outDir: string = path.resolve(__dirname, 'dist');
const srcDir: string = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const isPro: boolean = /^pro/g.test(mode);
	const plugins = [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag: string) => /^app-/.test(tag),
				},
			},
		}),
		isPro ? null : vueDevTools(),
		svg(),
	].filter(Boolean);

	return {
		base: './',
		plugins,
		resolve: {
			alias: {
				'@': srcDir,
			},
		},
		envDir,
		publicDir: isPro ? false : publicDir,
		build: {
			outDir,
			emptyOutDir: true,
		},
	};
});
