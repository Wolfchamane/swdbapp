import globals from 'globals';
import tseslint from 'typescript-eslint';
import baseConfig from '../../../eslint.config.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...baseConfig,
	{ languageOptions: { globals: globals.browser } },
	{
		files: ['**/*.ts'],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
	},
];
