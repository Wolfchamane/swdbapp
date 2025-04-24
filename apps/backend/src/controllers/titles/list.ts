import { selectAll, count } from './_queries';
import { query } from '../../db';
import type { Request, Response, NextFunction } from 'express';
import type { QueryResult, QueryConfig } from 'pg';
import { debug } from '../../log';
import type { SelectAllInput } from '../../types';
import type { TitleModel } from '@swdbapp/infra-http';
import { listController } from '../common';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const queryAll = async (input: SelectAllInput): Promise<TitleModel[]> => {
		const querySelectAllConfig: QueryConfig = await selectAll(input);
		debug('query all titles config: %s', JSON.stringify(querySelectAllConfig));
		const selectResponse: QueryResult<TitleModel> = await query(querySelectAllConfig);

		return selectResponse.rows.slice();
	};

	const queryCount = async (): Promise<number> => {
		const queryCountConfig: QueryConfig = await count();
		debug('query count titles config: %s', JSON.stringify(queryCountConfig));
		const countResponse: QueryResult = await query(queryCountConfig);

		return Number(countResponse.rows.pop().count);
	};

	return await listController<TitleModel>({ req, res, next, queryAll, queryCount });
};
