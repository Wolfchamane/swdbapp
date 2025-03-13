/* global module */
module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 'latest',
	},
	ignorePatterns: ['**/__tests__/*', '**/*/*.spec.ts', '**/generated/**'],
	rules: {
		camelcase: 'error',
		'default-case': 'error',
		'max-params': ['error', 5],
		'new-cap': 'error',
		'no-underscore-dangle': 'error',
	},
};
