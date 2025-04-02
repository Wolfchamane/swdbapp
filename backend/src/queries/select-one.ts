import type { SelectOneInput } from '../types';
import type { QueryConfig } from 'pg';
import format from '../utils/pg-format-importer';

export const selectOneQuery = async ({ id }: SelectOneInput, tableName: string): Promise<QueryConfig> => {
	const formatter = await format();

	return {
		text: formatter('SELECT * FROM %I WHERE id = %s;', tableName, id),
	};
};
