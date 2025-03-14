import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import rootConfig from '../../../eslint.config.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...rootConfig,
	...pluginVue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
	},
];
