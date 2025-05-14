import source from '../data/titles.json' with { type: 'json' };
import generator from '../utils/generator.mjs';
import scapeSingleQuotes from '../utils/scape-single-quotes.mjs';
import nullableValue from '../utils/nullable-value.mjs';

const titleProperties = [
	'name',
	'logo',
	'type',
	'poster',
	'rating',
	'duration',
	'release_date',
	'genre',
	'resume',
	'director',
	'music_director',
	'producers',
	'actors',
	'plot',
	'opening_crawl',
];

const valueLine = ({ name = '', ...rest }) =>
	`(${[
		`'${scapeSingleQuotes(name)}'`,
		...titleProperties.filter(prop => prop !== 'name').map(prop => nullableValue(rest[prop])),
	].join(', ')})`;

const fileTemplate = (values = []) =>
	`INSERT INTO "titles" (${titleProperties.map(prop => `"${prop}"`).join(', ')}) VALUES\n\t${values.join(',\n\t')};`;

generator({
	output: '03.titles.insert.sql',
	source,
	valueLine,
	fileTemplate,
});
