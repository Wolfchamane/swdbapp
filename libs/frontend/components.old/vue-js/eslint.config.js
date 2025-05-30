import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import baseConfig from '../../../../eslint.config.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...baseConfig,
	...pluginVue.configs['flat/essential'],
	{ languageOptions: { globals: globals.browser } },
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
	},
];
