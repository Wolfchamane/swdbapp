import { json } from './json.mjs';
import { notFound } from './not-found.mjs';

export const entity = (req = {}, res = {}, db = []) => {
	const { url = '' } = req;
	const id = url.replace(/.+\/(\w+)$/, '$1');
	const item = db.find(el => el._id === id);
	if (item) {
		json(res, 200, JSON.stringify(item));
	} else {
		notFound();
	}
};
