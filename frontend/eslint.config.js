import baseConfig from '../eslint.config.js';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [...baseConfig, { languageOptions: { globals: globals.browser } }];
