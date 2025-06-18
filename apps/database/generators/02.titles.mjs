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

const fileTemplate = ({ values = [], database = '' }) =>
	`INSERT INTO ${database}."titles" (${titleProperties.map(prop => `"${prop}"`).join(', ')}) VALUES\n\t${values.join(',\n\t')};`;

const tableInit = ({ database = '' }) => `DROP TABLE IF EXISTS ${database}."titles";

CREATE TABLE ${database}."titles"
(
	"id"             serial              NOT NULL,
	"name"           VARCHAR(512) UNIQUE NOT NULL,
	"logo"           VARCHAR(512),
	"type"           VARCHAR(16),
	"poster"         VARCHAR(512),
	"rating"         VARCHAR(16),
	"duration"       VARCHAR(13),
	"release_date"   VARCHAR(32),
	"genre"          VARCHAR(128),
	"resume"         TEXT,
	"director"       VARCHAR(128),
	"music_director" VARCHAR(128),
	"producers"      VARCHAR(512),
	"actors"         VARCHAR(1024),
	"plot"           TEXT,
	"opening_crawl"  TEXT
);

ALTER TABLE ${database}."titles"
	ADD CONSTRAINT "pk_titles" PRIMARY KEY ("id", "name");
`;

generator({
	output: '02.titles.sql',
	source,
	valueLine,
	fileTemplate,
	tableInit,
});
