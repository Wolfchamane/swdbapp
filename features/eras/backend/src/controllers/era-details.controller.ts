import type { TitleModel } from '@swdbapp/feature-titles-infra-http';
import type { EraModel, EraModelTitle } from '@swdbapp/feature-eras-infra-http';
import type { Request, Response, NextFunction } from 'express';
import type { QueryResult, QueryConfig } from 'pg';
import { selectOne, selectOneEraTitles } from './queries';
import { query, type AppResponse, type AppError, type Logger } from '@swdbapp/utils-backend';

export interface EraDetailsControllerInput {
	logger: Logger;
	selectOneTitleByTitle(tile: string): Promise<QueryConfig>;
}

export type EraDetailsControllerOutput = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const eraDetailsController = ({
	logger,
	selectOneTitleByTitle,
}: EraDetailsControllerInput): EraDetailsControllerOutput => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const id: string = req.params?.id || '';

		logger.log('<-- Handling: [%s] %s', req.method, req.url);

		try {
			const querySelectOneConfig: QueryConfig = await selectOne({ id });
			logger.debug(`querySelectOneConfig: ${JSON.stringify(querySelectOneConfig)}`);
			const selectResponse: QueryResult<EraModel> = await query(querySelectOneConfig);
			logger.debug('select one era performed!');

			const item: EraModel | undefined = selectResponse.rows.pop();
			if (item) {
				const querySelectOneEraTitlesConfig: QueryConfig = await selectOneEraTitles({ id: item.name });
				logger.debug(`querySelectOneEraTitlesConfig: ${JSON.stringify(querySelectOneEraTitlesConfig)}`);
				const eraTitlesResponse: QueryResult<{ title: string }> = await query(querySelectOneEraTitlesConfig);
				logger.debug('select one era titles performed!');

				logger.debug(`Number of titles for era "${item.name}": ${eraTitlesResponse.rows.length}`);
				for (const eraTitle of eraTitlesResponse.rows) {
					const queryTitleDetailConfig: QueryConfig = await selectOneTitleByTitle(eraTitle.title);
					logger.debug(`queryTitleDetailConfig: ${JSON.stringify(queryTitleDetailConfig)}`);
					const selectTitleDetailResponse: QueryResult<TitleModel> = await query(queryTitleDetailConfig);
					logger.debug('select title details performed!');

					const titleDetail: TitleModel | undefined = selectTitleDetailResponse.rows.pop();
					logger.debug(`titleDetail: ${JSON.stringify(titleDetail)}`);

					if (titleDetail) {
						if (!item.titles) {
							item.titles = [];
						}

						item.titles.push({
							id: titleDetail.id,
							title: titleDetail.title,
							logo: titleDetail.logo,
						} satisfies EraModelTitle);
					} else {
						logger.error('title detail not found for %s', eraTitle.title);
					}
				}
			} else {
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
