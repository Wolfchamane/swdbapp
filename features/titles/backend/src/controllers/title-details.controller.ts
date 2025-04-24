import type { TitleModel } from '@swdbapp/feature-titles-infra-http';
import type { Request, Response, NextFunction } from 'express';
import { query, type AppResponse, type AppError, type Logger } from '@swdbapp/utils-backend';
import type { QueryResult, QueryConfig } from 'pg';
import { selectOneById } from './queries';

export type TitleDetailsControllerOutput = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const titleDetailsController = (logger: Logger): TitleDetailsControllerOutput => {
	return async (req: Request, _: Response, next: NextFunction): Promise<void> => {
		const id: string = req.params?.id || '';

		logger.log('<-- Handling: [%s] %s', req.method, req.url);

		try {
			const querySelectOneConfig: QueryConfig = await selectOneById({ id });
			logger.debug(`querySelectOneConfig: ${JSON.stringify(querySelectOneConfig)}`);
			const selectResponse: QueryResult<TitleModel> = await query(querySelectOneConfig);
			logger.debug('select one title performed!');

			const item: TitleModel | undefined = selectResponse.rows.pop();
			if (!item) {
				logger.error(`era "${id}" not found!`);
			}

			const response: AppResponse | AppError = {
				status: item ? 200 : 404,
				message: item ? JSON.stringify(item) : 'Not Found',
			};

			next(response);
		} catch (e: unknown) {
			logger.error((e as Error).message);
			next(e as AppError);
		}
	};
};
