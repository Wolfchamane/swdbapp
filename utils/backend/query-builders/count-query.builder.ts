import type { QueryConfig } from 'pg';
import { format } from '../vendor/pg-format';

export const countQueryBuilder = async (tableName: string): Promise<QueryConfig> => {
	return {
		text: format(`SELECT COUNT(*) FROM %I;`, tableName),
	};
};
