import type { SelectAllInput } from '../types';
import type { QueryConfig } from 'pg';
import format from '../utils/pg-format-importer';

export const selectAllQuery = async (
	input: SelectAllInput,
	tableName: string,
	tableProps: string[]
): Promise<QueryConfig> => {
	const formatter = await format();

	const { limit, orderBy, orderDir, searchBy, search, offset } = input;
	const values: string[] = [tableName];
	let text: string = `SELECT ${tableProps.join(', ')} FROM %I`;

	if (searchBy && search) {
		text += ` WHERE %I = %L`;
		values.push(searchBy);
		values.push(search);
	}

	if (orderBy) {
		text += ` ORDER BY %I %s`;
		values.push(orderBy);
		values.push((orderDir || 'desc').toUpperCase());
	}

	if (limit) {
		text += ` LIMIT %s`;
		values.push(limit);
	}

	if (offset) {
		text += ` OFFSET %s`;
		values.push(offset);
	}

	text += ';';

	text = formatter(text, ...values);

	return {
		text,
	};
};
