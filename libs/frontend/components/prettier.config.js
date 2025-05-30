import baseConfig from '../../../prettier.config.js';

export default {
	...baseConfig,
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: ['.+styles$', '^lit', '^@swdbapp/(.*)$', '^@(.+)', '^@/(.*)', '^../(.*)', '^./'],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
	importOrderParserPlugins: ['decorators', 'typescript'],
};
