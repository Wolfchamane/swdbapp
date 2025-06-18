import source from '../data/era_titles.json' with { type: 'json' };
import generator from '../utils/generator.mjs';
import scapeSingleQuotes from '../utils/scape-single-quotes.mjs';

const valueLine = ({ order = -1, era = '', title = '' }) => `(${order}, '${era}', '${scapeSingleQuotes(title)}')`;

const fileTemplate = ({ values = [], database = '' }) =>
	`INSERT INTO ${database}."era_titles" ("order", "era", "title") VALUES\n\t${values.join(',\n\t')};`;

const tableInit = ({ database = '' }) => `DROP TABLE IF EXISTS ${database}."era_titles";

CREATE TABLE IF NOT EXISTS ${database}."era_titles" (
    "era" VARCHAR(512) NOT NULL,
    "title" VARCHAR(512) NOT NULL,
    "order" INTEGER
);

ALTER TABLE ${database}."era_titles"
    ADD CONSTRAINT "fk_era_titles__era" FOREIGN KEY ("era") REFERENCES ${database}."eras"("name");

ALTER TABLE ${database}."era_titles"
    ADD CONSTRAINT "fk_era_titles__title" FOREIGN KEY ("title") REFERENCES ${database}."titles"("name");
`;

generator({
	output: '03.era_titles.sql',
	source,
	valueLine,
	fileTemplate,
	tableInit,
});
