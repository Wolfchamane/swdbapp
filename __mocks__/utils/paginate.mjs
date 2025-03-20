import { json } from './json.mjs';

const LIMIT = 10;

export const paginate = (req = {}, res = {}, db = []) => {
	const { url = '' } = req;

	const total = db.length;
	const page = /page=\d+/.test(url) ? Number(url.replace(/.+page=(\d+)/, '$1')) : 1;
	const limit = /limit=\d+/.test(url) ? Number(url.replace(/.+limit=(\d+).+/, '$1')) : LIMIT;
	const totalPages = Math.ceil(Number(total / LIMIT));
	const next = page < totalPages ? `/characters?page=${Number(page + 1)}` : null;
	const prev = page >= 2 ? `/characters?page=${Number(page - 1)}` : null;

	const from = Number(Number(page - 1) * limit);
	const to = Number(from + limit);

	json(
		res,
		200,
		JSON.stringify({
			info: {
				total,
				limit,
				page,
				next,
				prev,
			},
			data: db.slice(from, to),
		})
	);
};
