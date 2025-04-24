import type { SelectOneInput, SelectAllInput } from '../types';
import type { QueryConfig } from 'pg';
import { selectAllQueryBuilder } from './select-all-query.builder';

export const selectOneQueryBuilder = async (
	{ id, ...rest }: SelectOneInput,
	tableName: string,
	tableProps?: string[]
): Promise<QueryConfig> => {
	const selectAllInput: SelectAllInput = {
		...rest,
		search: id,
	};

	return await selectAllQueryBuilder(selectAllInput, tableName, tableProps || ['*']);
};
