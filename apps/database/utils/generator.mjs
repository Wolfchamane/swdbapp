import path from 'node:path';
import { existsSync, writeFileSync } from 'node:fs';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const OUTPUT_PATH = path.resolve(__dirname, '..', 'output');

export default ({ output = '', source = null, valueLine = () => '', fileTemplate = () => '' }) => {
	if (!Array.isArray(source)) {
		console.error(`[@swdbapp/database] source for ${output} is not an array`);
		process.exit(1);
	}

	if (!existsSync(OUTPUT_PATH)) {
		console.error(`[@swdbapp/database] output path does no exists!`);
		process.exit(1);
	}

	console.log(`[@swdbapp/database] Generating data for "${output}"`);

	writeFileSync(
		path.join(OUTPUT_PATH, output),
		fileTemplate(source.map(valueLine)).replace(/\'(NULL)\'/g, '$1'),
		'utf-8'
	);
};
