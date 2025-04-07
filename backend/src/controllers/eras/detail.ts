import type { EraModel, TitleModel, EraModelTitle } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { query } from '../../db';
import { selectOne, selectOneEraTitles } from './_queries';
import type { QueryResult, QueryConfig } from 'pg';
import type { AppResponse, AppError } from '../../types';
import { selectOneByTitle } from '../titles';
import { log, debug, error } from '../../log';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const id: string = req.params?.id || '';

	log('<-- Handling: [%s] %s', req.method, req.url);

	try {
		const querySelectOneConfig: QueryConfig = await selectOne({ id });
		debug(`querySelectOneConfig: ${JSON.stringify(querySelectOneConfig)}`);
		const selectResponse: QueryResult<EraModel> = await query(querySelectOneConfig);
		debug('select one era performed!');

		const item: EraModel | undefined = selectResponse.rows.pop();
		if (item) {
			const querySelectOneEraTitlesConfig: QueryConfig = await selectOneEraTitles({ id: item.name });
			debug(`querySelectOneEraTitlesConfig: ${JSON.stringify(querySelectOneEraTitlesConfig)}`);
			const eraTitlesResponse: QueryResult<{ title: string }> = await query(querySelectOneEraTitlesConfig);
			debug('select one era titles performed!');

			debug(`Number of titles for era "${item.name}": ${eraTitlesResponse.rows.length}`);
			for (const eraTitle of eraTitlesResponse.rows) {
				const queryTitleDetailConfig: QueryConfig = await selectOneByTitle({ id: eraTitle.title });
				debug(`queryTitleDetailConfig: ${JSON.stringify(queryTitleDetailConfig)}`);
				const selectTitleDetailResponse: QueryResult<TitleModel> = await query(queryTitleDetailConfig);
				debug('select title details performed!');

				const titleDetail: TitleModel | undefined = selectTitleDetailResponse.rows.pop();
				debug(`titleDetail: ${JSON.stringify(titleDetail)}`);

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
					error('title detail not found for %s', eraTitle.title);
				}
			}
		} else {
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
