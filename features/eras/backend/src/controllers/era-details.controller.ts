import type { TitleDetailResponse } from '@swdbapp/feature-titles-infra-http';
import type { EraDetailResponse, EraTitle } from '@swdbapp/feature-eras-infra-http';
import type { Request, Response, NextFunction } from 'express';
import type { QueryResult, QueryConfig } from 'pg';
import { selectAllEraTitlesByEraName, selectOne } from './queries';
import { query, type AppResponse, type AppError, type Logger, normalizeObjectKeys } from '@swdbapp/utils-backend';

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
			const selectResponse: QueryResult<EraDetailResponse> = await query(querySelectOneConfig);
			logger.debug('select one era performed!');

			const item: EraDetailResponse | undefined = selectResponse.rows.pop();
			if (item) {
				const querySelectAllEraTitlesConfig: QueryConfig = await selectAllEraTitlesByEraName({
					era: item.name,
				});
				logger.debug(`querySelectOneEraTitlesConfig: ${JSON.stringify(querySelectAllEraTitlesConfig)}`);
				const eraTitlesResponse: QueryResult<{ order: number; title: string }> =
					await query(querySelectAllEraTitlesConfig);
				logger.debug('select one era titles performed!');

				logger.debug(`Number of titles for era "${item.name}": ${eraTitlesResponse.rows.length}`);
				for (const eraTitle of eraTitlesResponse.rows) {
					const queryTitleDetailConfig: QueryConfig = await selectOneTitleByTitle(eraTitle.title);
					logger.debug(`queryTitleDetailConfig: ${JSON.stringify(queryTitleDetailConfig)}`);
					const selectTitleDetailResponse: QueryResult<TitleDetailResponse> =
						await query(queryTitleDetailConfig);
					logger.debug('select title details performed!');

					const titleDetail: TitleDetailResponse | undefined = selectTitleDetailResponse.rows.pop();
					logger.debug(`titleDetail: ${JSON.stringify(titleDetail)}`);

					if (titleDetail) {
						if (!item.titles) {
							item.titles = [];
						}

						item.titles.push({
							id: titleDetail.id,
							order: item.titles.length,
							title: titleDetail.name,
							logo: titleDetail.logo,
						} satisfies EraTitle);
					} else {
						logger.error('title detail not found for %s', eraTitle.title);
					}
				}
			} else {
				logger.error(`era "${id}" not found!`);
			}

			const response: AppResponse | AppError = {
				status: item ? 200 : 404,
				message: item || 'Not Found',
			};

			next(response);
		} catch (e: unknown) {
			logger.error((e as Error).message);
			next(e as AppError);
		}
	};
};
