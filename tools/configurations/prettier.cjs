/* global module */

module.exports = {
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	jsxSingleQuote: false,
	trailingComma: 'es5',
	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: 'avoid',
	vueIndentScriptAndStyle: true,
	endOfLine: 'lf',
	singleAttributePerLine: false,
	htmlWhitespaceSensitivity: 'css',
	importOrder: ['^./(.*).s(a|c)ss$', '^@swdbapp/(.*)$', '^@/(.*)', '^../(.*)', '^./'],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
};
