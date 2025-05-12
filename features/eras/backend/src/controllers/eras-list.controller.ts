import type { EraItem } from '@swdbapp/feature-eras-infra-http';
import type { Request, Response, NextFunction } from 'express';
import { selectAll, count } from './queries';
import { listController, type Logger, type SelectAllInput, query, normalizeObjectKeys } from '@swdbapp/utils-backend';
import type { QueryConfig, QueryResult } from 'pg';

export interface ErasListControllerInput {
	logger: Logger;
}

export type ErasListControllerOutput = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const erasListController = ({ logger }: ErasListControllerInput): ErasListControllerOutput => {
	const queryAll = async (input: SelectAllInput): Promise<EraItem[]> => {
		const querySelectAllConfig: QueryConfig = await selectAll(input);
		logger.debug('query all eras config: %s', JSON.stringify(querySelectAllConfig));
		const selectResponse: QueryResult<EraItem> = await query(querySelectAllConfig);

		return selectResponse.rows.slice();
	};

	const queryCount = async (): Promise<number> => {
		const queryCountConfig: QueryConfig = await count();
		logger.debug('query count eras config: %s', JSON.stringify(queryCountConfig));
		const countResponse: QueryResult = await query(queryCountConfig);

		return Number(countResponse.rows[0].count);
	};

	return listController<EraItem>({ logger, queryAll, queryCount });
};
