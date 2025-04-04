import type { EraModel } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { query } from '../../db';
import { selectOne } from './_queries';
import type { QueryResult, QueryConfig } from 'pg';
import type { AppResponse, AppError } from '../../types';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const id: string = req.params?.id || '';
	try {
		const querySelectOneConfig: QueryConfig = await selectOne({ id });
		const selectResponse: QueryResult<EraModel> = await query(querySelectOneConfig);

		const item: EraModel | undefined = selectResponse.rows.pop();
		const response: AppResponse | AppError = {
			status: item ? 200 : 404,
			message: item ? JSON.stringify(item) : 'Not Found',
		};

		next(response);
	} catch (e: unknown) {
		next(e as AppError);
	}
};
