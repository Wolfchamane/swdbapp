import source from '../data/eras.json' with { type: 'json' };
import generator from '../utils/generator.mjs';
import nullableValue from '../utils/nullable-value.mjs';

const tableInit = ({ database = '' }) => `DROP TABLE IF EXISTS ${database}."eras";

CREATE TABLE ${database}."eras"
(
	"id"          serial              NOT NULL,
	"name"        VARCHAR(512) UNIQUE NOT NULL,
	"image"       VARCHAR(512),
	"description" VARCHAR(512)
);

ALTER TABLE ${database}."eras"
	ADD CONSTRAINT "pk_eras" PRIMARY KEY ("id", "name");`;

const valueLine = ({ name = '', image = '', description = '' }) =>
	`('${name}', ${nullableValue(image)}, ${nullableValue(description)})`;

const fileTemplate = ({ values = [], database = '' }) =>
	`INSERT INTO ${database}."eras" ("name", "image", "description") VALUES\n\t${values.join(',\n\t')};`;

generator({
	output: '01.eras.sql',
	source,
	valueLine,
	fileTemplate,
	tableInit,
});
