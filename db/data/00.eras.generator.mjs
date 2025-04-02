import source from '@swdbapp/data/eras.json' with { type: 'json' };
import generator from './_generator.mjs';

const valueLine = ({ name = '', image = '', description = '' }) => `('${name}', '${image}', '${description}')`;
const fileTemplate = (values = []) =>
	`INSERT INTO "eras" ("name", "image", "description") VALUES\n\t${values.join(',\n\t')};`;

generator({
	output: '01.eras.insert.sql',
	source,
	valueLine,
	fileTemplate,
});
