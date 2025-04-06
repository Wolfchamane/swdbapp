import {
	ERAS_TABLE_NAME,
	ERAS_TABLE_FIELD_ID,
	ERAS_TABLE_FIELD_NAME,
	ERAS_TABLE_FIELD_DESCRIPTION,
	ERAS_TABLE_FIELD_IMAGE,
	ERA_TITLES_TABLE_NAME,
	ERA_TITLES_FIELD_TITLE,
	ERA_TITLES_FIELD_ERA,
	ERA_TITLES_FIELD_ORDER,
} from './_constants';
import type { QueryConfig } from 'pg';
import type { SelectOneInput, SelectAllInput } from '../../types';
import { countQuery, selectAllQuery, selectOneQuery } from '../../queries';

export const count = async (): Promise<QueryConfig> => countQuery(ERAS_TABLE_NAME);

export const selectAll = async (input: SelectAllInput): Promise<QueryConfig> =>
	selectAllQuery(input, ERAS_TABLE_NAME, [
		ERAS_TABLE_FIELD_ID,
		ERAS_TABLE_FIELD_NAME,
		ERAS_TABLE_FIELD_DESCRIPTION,
		ERAS_TABLE_FIELD_IMAGE,
	]);

export const selectOne = async (input: SelectOneInput): Promise<QueryConfig> => {
	const selectOneQueryInput = {
		...input,
		searchBy: ERAS_TABLE_FIELD_ID,
	};
	return selectOneQuery(selectOneQueryInput, ERAS_TABLE_NAME);
};

export const selectOneEraTitles = async (input: SelectOneInput): Promise<QueryConfig> => {
	const selectOneQueryInput = {
		...input,
		searchBy: ERA_TITLES_FIELD_ERA,
		orderBy: ERA_TITLES_FIELD_ORDER,
		orderDir: 'asc',
	};

	return selectOneQuery(selectOneQueryInput, ERA_TITLES_TABLE_NAME, [ERA_TITLES_FIELD_TITLE]);
};
