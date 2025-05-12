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
} from './constants';
import type { QueryConfig } from 'pg';
import {
	countQueryBuilder,
	selectAllQueryBuilder,
	selectOneQueryBuilder,
	type SelectOneInput,
	type SelectAllInput,
} from '@swdbapp/utils-backend';

export const count = async (): Promise<QueryConfig> => countQueryBuilder(ERAS_TABLE_NAME);

export const selectAll = async (input: SelectAllInput): Promise<QueryConfig> =>
	selectAllQueryBuilder(input, ERAS_TABLE_NAME, [
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
	return selectOneQueryBuilder(selectOneQueryInput, ERAS_TABLE_NAME);
};

export const selectAllEraTitlesByEraName = async ({ era }: { era: string }): Promise<QueryConfig> =>
	selectAllQueryBuilder(
		{
			search: era,
			searchBy: ERA_TITLES_FIELD_ERA,
		},
		ERA_TITLES_TABLE_NAME,
		['*']
	);
