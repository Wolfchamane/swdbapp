import source from '@swdbapp/data/titles.json' with { type: 'json' };
import generator from './_generator.mjs';
import scapeSingleQuotes from '../utils/scape-single-quotes.mjs';

const valueLine = ({ title = '', logo = '' }) => `('${scapeSingleQuotes(title)}', '${logo}')`;

const fileTemplate = (values = []) => `INSERT INTO "titles" ("title", "logo") VALUES\n\t${values.join(',\n\t')};`;

generator({
	output: '03.titles.insert.sql',
	source,
	valueLine,
	fileTemplate,
});
