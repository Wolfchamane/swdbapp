import path from 'node:path';
import { writeFileSync } from 'node:fs';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const OUTPUT_PATH = path.resolve(__dirname, '..', 'output');
const password = process.env.PGPASSWORD;
const user = process.env.PGUSER;
const database = process.env.PGDATABASE;

(() => {
	if (user && password) {
		const content = `CREATE ROLE swdb_admin;
ALTER ROLE swdb_admin CREATEDB;
DROP DATABASE IF EXISTS ${database};
CREATE DATABASE ${database};
GRANT ALL PRIVILEGES ON DATABASE ${database} TO swdb_admin;
CREATE SCHEMA IF NOT EXISTS ${database} AUTHORIZATION swdb_admin;
GRANT ALL PRIVILEGES ON SCHEMA ${database} TO swdb_admin;
CREATE USER ${user} WITH ENCRYPTED PASSWORD '${password}' IN GROUP swdb_admin LOGIN;`;

		const outputFileName = '00.db.init.sql';
		console.log('[@swdbapp/database] Generating data for "%s"', outputFileName);
		const outputFilePath = path.join(OUTPUT_PATH, outputFileName);
		writeFileSync(outputFilePath, content, 'utf-8');
	} else {
		throw new Error('[@swdbapp/database] Could not obtain either user or password from environment variables!');
	}
})();
