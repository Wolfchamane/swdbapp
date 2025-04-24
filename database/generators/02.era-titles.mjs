import source from '../data/era_titles.json' with { type: 'json' };
import generator from '../utils/generator.mjs';
import scapeSingleQuotes from '../utils/scape-single-quotes.mjs';

const valueLine = ({ order = -1, era = '', title = '' }) => `(${order}, '${era}', '${scapeSingleQuotes(title)}')`;

const fileTemplate = (values = []) =>
	`INSERT INTO "era_titles" ("order", "era", "title") VALUES\n\t${values.join(',\n\t')};`;

generator({
	output: '05.era_titles.insert.sql',
	source,
	valueLine,
	fileTemplate,
});
