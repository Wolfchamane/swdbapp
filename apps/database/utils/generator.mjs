import path from 'node:path';
import { existsSync, writeFileSync } from 'node:fs';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const OUTPUT_PATH = path.resolve(__dirname, '..', 'output');
const database = process.env.PGDATABASE;

export default ({ output = '', source = null, valueLine = () => '', fileTemplate = () => '', tableInit = () => '' }) => {
	if (!Array.isArray(source)) {
		console.error(`[@swdbapp/database] source for ${output} is not an array`);
		process.exit(1);
	}

	if (!existsSync(OUTPUT_PATH)) {
		console.error(`[@swdbapp/database] output path does no exists!`);
		process.exit(1);
	}

	console.log(`[@swdbapp/database] Generating data for "${output}"`);

	const values = source.map(valueLine);
	const inserts = fileTemplate({ values, database }).replace(/\'(NULL)\'/g, '$1');
	const content = `${tableInit({ database })}

${inserts}`;

	writeFileSync(
		path.join(OUTPUT_PATH, output),
		content,
		'utf-8'
	);
};
