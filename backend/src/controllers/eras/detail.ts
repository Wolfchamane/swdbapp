import type { EraModel } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { provideDBPool } from '../../db';
import { selectOne } from './_queries';
import type { PoolClient, QueryResult, QueryConfig } from 'pg';
import type { AppResponse, AppError } from '../../types';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const pool = provideDBPool();

	const id: string = req.params?.id || '';

	let client: void | PoolClient | undefined;
	try {
		client = await pool.connect();
		if (client) {
			const query: QueryConfig = await selectOne({ id });
			const selectResponse: QueryResult<EraModel> = await client.query(query);

			const item: EraModel | undefined = selectResponse.rows.pop();
			const response: AppResponse | AppError = {
				status: item ? 200 : 404,
				message: item ? JSON.stringify(item) : 'Not Found',
			};

			next(response);
		}
	} catch (e: unknown) {
		next(e as AppError);
	} finally {
		client?.release();
	}
};
