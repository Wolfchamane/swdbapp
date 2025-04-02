import source from '../../db-data/titles.json' with { type: 'json' };
import generator from './_generator.mjs';
import scapeSingleQuotes from '../utils/scape-single-quotes.mjs';
import nullableValue from '../utils/nullable-value.mjs';

const titleProperties = [
    "title",
    "logo",
    "type",
    "poster",
    "rating",
    "duration",
    "release_date",
    "genre",
    "resume",
    "director",
    "music_director",
    "producers",
    "actors",
    "plot",
    "opening_crawl",
];

const valueLine = ({ title = '', ...rest }) => `(${[
    `'${scapeSingleQuotes(title)}'`,
    ...titleProperties.filter(prop => prop !== 'title').map(prop => nullableValue(rest[prop])),
].join(', ')})`;

const fileTemplate = (values = []) =>
    `INSERT INTO "titles" (${titleProperties.map(prop => `"${prop}"`).join(', ')}) VALUES\n\t${values.join(',\n\t')};`;

generator({
	output: '03.titles.insert.sql',
	source,
	valueLine,
	fileTemplate,
});
