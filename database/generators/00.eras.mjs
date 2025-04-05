import source from '../../database-data/eras.json' with { type: 'json' };
import generator from '../utils/generator.mjs';
import nullableValue from '../utils/nullable-value.mjs';

const valueLine = ({ name = '', image = '', description = '' }) =>
	`('${name}', ${nullableValue(image)}, ${nullableValue(description)})`;

const fileTemplate = (values = []) =>
	`INSERT INTO "eras" ("name", "image", "description") VALUES\n\t${values.join(',\n\t')};`;

generator({
	output: '01.eras.insert.sql',
	source,
	valueLine,
	fileTemplate,
});
