import { entity, notFound, paginate } from '../utils/index.mjs';
import { database } from './database.mjs';

export const charactersListHandler = (req, res) => {
	const { url = '', method = '' } = req;
	if (/\/characters(\?page=\d+(&limit=\d+)?)?$/.test(url) && method === 'GET') {
		paginate(req, res, database);
	} else if (/\/characters\/(\w+)$/.test(url) && method === 'GET') {
		entity(req, res, database);
	} else {
		notFound();
	}
};
