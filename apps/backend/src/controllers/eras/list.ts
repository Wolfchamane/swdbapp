import type { EraModel } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { query } from '../../db';
import { selectAll, count } from './_queries';
import type { QueryResult, QueryConfig } from 'pg';
import type { SelectAllInput } from '../../types';
import { debug } from '../../log';
import { listController } from '../common';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const queryAll = async (input: SelectAllInput): Promise<EraModel[]> => {
		const querySelectAllConfig: QueryConfig = await selectAll(input);
		debug('query all eras config: %s', JSON.stringify(querySelectAllConfig));
		const selectResponse: QueryResult<EraModel> = await query(querySelectAllConfig);

		return selectResponse.rows.slice();
	};

	const queryCount = async (): Promise<number> => {
		const queryCountConfig: QueryConfig = await count();
		debug('query count eras config: %s', JSON.stringify(queryCountConfig));
		const countResponse: QueryResult = await query(queryCountConfig);

		return Number(countResponse.rows[0].count);
	};

	return await listController<EraModel>({ req, res, next, queryAll, queryCount });
};
