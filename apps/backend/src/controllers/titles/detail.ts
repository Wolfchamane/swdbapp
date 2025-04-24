import type { TitleModel } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { query } from '../../db';
import { selectOneById } from './_queries';
import type { QueryResult, QueryConfig } from 'pg';
import type { AppResponse, AppError } from '../../types';
import { log, debug, error } from '../../log';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const id: string = req.params?.id || '';

	log('<-- Handling: [%s] %s', req.method, req.url);

	try {
		const querySelectOneConfig: QueryConfig = await selectOneById({ id });
		debug(`querySelectOneConfig: ${JSON.stringify(querySelectOneConfig)}`);
		const selectResponse: QueryResult<TitleModel> = await query(querySelectOneConfig);
		debug('select one title performed!');

		const item: TitleModel | undefined = selectResponse.rows.pop();
		if (!item) {
			error(`era "${id}" not found!`);
		}

		const response: AppResponse | AppError = {
			status: item ? 200 : 404,
			message: item ? JSON.stringify(item) : 'Not Found',
		};

		next(response);
	} catch (e: unknown) {
		error((e as Error).message);
		next(e as AppError);
	}
};
