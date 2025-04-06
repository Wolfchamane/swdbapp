import type { EraModel, TitleModel, EraModelTitle } from '@swdbapp/infra-http';
import type { Request, Response, NextFunction } from 'express';
import { query } from '../../db';
import { selectOne, selectOneEraTitles } from './_queries';
import type { QueryResult, QueryConfig } from 'pg';
import type { AppResponse, AppError } from '../../types';
import { selectOneByTitle } from '../titles';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const id: string = req.params?.id || '';
	try {
		const querySelectOneConfig: QueryConfig = await selectOne({ id });
		// console.log(`querySelectOneConfig: ${JSON.stringify(querySelectOneConfig)}`);
		const selectResponse: QueryResult<EraModel> = await query(querySelectOneConfig);

		const item: EraModel | undefined = selectResponse.rows.pop();
		if (item) {
			const querySelectOneEraTitlesConfig: QueryConfig = await selectOneEraTitles({ id: item.name });
			// console.log(`querySelectOneEraTitlesConfig: ${JSON.stringify(querySelectOneEraTitlesConfig)}`);
			const eraTitlesResponse: QueryResult<{ title: string }> = await query(querySelectOneEraTitlesConfig);

			// console.log(`# "${item.name}" era titles: ${eraTitlesResponse.rows.length}`);
			for (const eraTitle of eraTitlesResponse.rows) {
				const queryTitleDetailConfig: QueryConfig = await selectOneByTitle({ id: eraTitle.title });
				// console.log(`queryTitleDetailConfig: ${JSON.stringify(queryTitleDetailConfig)}`);

				const selectTitleDetailResponse: QueryResult<TitleModel> = await query(queryTitleDetailConfig);
				const titleDetail: TitleModel | undefined = selectTitleDetailResponse.rows.pop();
				// console.log(`titleDetail: ${JSON.stringify(titleDetail)}`);

				if (titleDetail) {
					if (!item.titles) {
						item.titles = [];
					}

					item.titles.push({
						id: titleDetail.id,
						title: titleDetail.title,
						logo: titleDetail.logo,
					} satisfies EraModelTitle);
				}
			}
		}

		const response: AppResponse | AppError = {
			status: item ? 200 : 404,
			message: item ? JSON.stringify(item) : 'Not Found',
		};

		next(response);
	} catch (e: unknown) {
		next(e as AppError);
	}
};
