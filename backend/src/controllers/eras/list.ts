import type { EraModel, ListOutput } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { provideDBPool } from '../../db';
import { selectAll, count } from './_queries';
import type { PoolClient, QueryResult, QueryConfig } from 'pg';
import { DEFAULT_LIMIT, DEFAULT_ORDER_BY, DEFAULT_ORDER_DIR, DEFAULT_OFFSET } from '../../constants';
import { AppResponse, AppError } from '../../types';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const pool = provideDBPool();

	const limit: string = `${req.query?.limit || DEFAULT_LIMIT}`;
	const offset: string = `${req.query?.offset || DEFAULT_OFFSET}`;
	const orderBy: string = `${req.query?.orderBy || DEFAULT_ORDER_BY}`;
	const orderDir: string = `${req.query?.orderDir || DEFAULT_ORDER_DIR}`;
	const searchBy: string = `${req.query?.searchBy || ''}`;
	const search: string = `${req.query?.search || ''}`;

	let client: void | PoolClient | undefined;
	try {
		client = await pool.connect();
		if (client) {
			const query: QueryConfig = await selectAll({ limit, orderBy, orderDir, searchBy, search, offset });
			const selectResponse: QueryResult<EraModel> = await client.query(query);
			const countResponse: QueryResult = await client.query(await count());

			const items = selectResponse.rows.slice();
			const total = Number(countResponse.rows[0].count);

			const listOutput: ListOutput<EraModel> = {
				offset: Number(offset),
				limit: Number(limit),
				total,
				items,
			};

			next({
				status: 200,
				message: JSON.stringify(listOutput),
			} as AppResponse);
		}
	} catch (e: unknown) {
		next(e as AppError);
	} finally {
		client?.release();
	}
};
