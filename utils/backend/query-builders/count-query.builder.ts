import type { QueryConfig } from 'pg';
import format from '../utils/pg-format-importer';

export const countQueryBuilder = async (tableName: string): Promise<QueryConfig> => {
	const formatter = await format();

	return {
		text: formatter(`SELECT COUNT(*) FROM %I;`, tableName),
	};
};
