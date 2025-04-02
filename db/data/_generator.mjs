import fs from 'node:fs';
import path from 'node:path';

const SCRIPTS_PATH = path.resolve(path.join(process.cwd(), 'db', 'scripts'));

export default ({ output = '', source = null, valueLine = () => '', fileTemplate = () => '' }) => {
	if (Array.isArray(source)) {
		fs.writeFileSync(
			path.join(SCRIPTS_PATH, output),
			fileTemplate(source.map(valueLine)).replace(/\'(NULL)\'/g, '$1')
		);
	}
};
