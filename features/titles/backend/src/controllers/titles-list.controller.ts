import type { QueryConfig, QueryResult } from 'pg';
import type { TitleModel } from '@swdbapp/infra-http';
import { listController, query, type Logger, type SelectAllInput } from '@swdbapp/utils-backend';
import { selectAll, count } from './queries';

export const titlesListController = (logger: Logger) => {
	const queryAll = async (input: SelectAllInput): Promise<TitleModel[]> => {
		const querySelectAllConfig: QueryConfig = await selectAll(input);
		logger.debug('query all titles config: %s', JSON.stringify(querySelectAllConfig));
		const selectResponse: QueryResult<TitleModel> = await query(querySelectAllConfig);

		return selectResponse.rows.slice();
	};

	const queryCount = async (): Promise<number> => {
		const queryCountConfig: QueryConfig = await count();
		logger.debug('query count titles config: %s', JSON.stringify(queryCountConfig));
		const countResponse: QueryResult = await query(queryCountConfig);

		return Number(countResponse.rows.pop().count);
	};

	return listController({ logger, queryAll, queryCount });
};
