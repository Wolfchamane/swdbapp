import {
	ERAS_TABLE_NAME,
	ERAS_TABLE_FIELD_ID,
	ERAS_TABLE_FIELD_NAME,
	ERAS_TABLE_FIELD_DESCRIPTION,
	ERAS_TABLE_FIELD_IMAGE,
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

export const selectOne = async (input: SelectOneInput): Promise<QueryConfig> => selectOneQuery(input, ERAS_TABLE_NAME);
