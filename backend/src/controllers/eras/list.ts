import type { EraModel, ListOutput } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { query } from '../../db';
import { selectAll, count } from './_queries';
import type { QueryResult, QueryConfig } from 'pg';
import { DEFAULT_LIMIT, DEFAULT_ORDER_BY, DEFAULT_ORDER_DIR, DEFAULT_OFFSET } from '../../constants';
import type { AppResponse, AppError, SelectAllInput } from '../../types';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	// console.log('[DEBUG] Request to: %s', req.url);

	const limit: string = `${req.query?.limit || DEFAULT_LIMIT}`;
	const offset: string = `${req.query?.offset || DEFAULT_OFFSET}`;
	const orderBy: string = `${req.query?.orderBy || DEFAULT_ORDER_BY}`;
	const orderDir: string = `${req.query?.orderDir || DEFAULT_ORDER_DIR}`;
	const searchBy: string = `${req.query?.searchBy || ''}`;
	const search: string = `${req.query?.search || ''}`;

	const selectAllInput: SelectAllInput = { limit, orderBy, orderDir, searchBy, search, offset };
	// console.log('[DEBUG] select input: %s', JSON.stringify(selectAllInput));

	try {
		const querySelectAllConfig: QueryConfig = await selectAll(selectAllInput);
		// console.log('[DEBUG] query select all: %s', JSON.stringify(querySelectAllConfig));
		const selectResponse: QueryResult<EraModel> = await query(querySelectAllConfig);
		// console.log('[DEBUG] select query performed!');

		const queryCountConfig: QueryConfig = await count();
		// console.log('[DEBUG] query count: %s', JSON.stringify(queryCountConfig));
		const countResponse: QueryResult = await query(queryCountConfig);
		// console.log('[DEBUG] count performed!');

		const items = selectResponse.rows.slice();
		const total = Number(countResponse.rows[0].count);

		const listOutput: ListOutput<EraModel> = {
			offset: Number(offset),
			limit: Number(limit),
			total,
			items,
		};

		// console.log('[DEBUG] Response: %s', JSON.stringify(listOutput));

		next({
			status: 200,
			message: JSON.stringify(listOutput),
		} as AppResponse);
	} catch (e: unknown) {
		// console.error(`[ERROR]\n${e}`);
		next(e as AppError);
	}
};
