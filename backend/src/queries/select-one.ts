import type { SelectOneInput, SelectAllInput } from '../types';
import type { QueryConfig } from 'pg';
import { selectAllQuery } from './select-all';

export const selectOneQuery = async (
	{ id, ...rest }: SelectOneInput,
	tableName: string,
	tableProps?: string[]
): Promise<QueryConfig> => {
	const selectAllInput: SelectAllInput = {
		...rest,
		search: id,
	};

	return await selectAllQuery(selectAllInput, tableName, tableProps || ['*']);
};
