import baseConfig from '../../../prettier.config.js';

export default {
	...baseConfig,
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: ['^.+/(.*).(sa|sc|c)ss$', '^@?(vue|react).+', '^@swdbapp/(.*)$', '^@/(.*)', '^../(.*)', '^./'],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
	vueIndentScriptAndStyle: true,
};
