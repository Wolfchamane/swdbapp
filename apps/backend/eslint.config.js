import baseConfig from '../../eslint.config.js';

const backendConfig = [
	...baseConfig,
	{
		ignores: ['dist'],
	},
];

/** @type {import('eslint').Linter.Config[]} */
export default [...backendConfig];
