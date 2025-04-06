import {
    TITLES_TABLE_NAME,
    TITLES_TABLE_FIELD_ID,
    TITLES_TABLE_FIELD_TITLE,
    TITLES_TABLE_FIELD_LOGO,
    TITLES_TABLE_FIELD_TYPE,
    TITLES_TABLE_FIELD_POSTER,
    TITLES_TABLE_FIELD_RATING,
    TITLES_TABLE_FIELD_DURATION,
    TITLES_TABLE_FIELD_RELEASE_DATE,
    TITLES_TABLE_FIELD_GENRE,
    TITLES_TABLE_FIELD_RESUME,
    TITLES_TABLE_FIELD_DIRECTOR,
    TITLES_TABLE_FIELD_MUSIC_DIRECTOR,
    TITLES_TABLE_FIELD_PRODUCERS,
    TITLES_TABLE_FIELD_ACTORS,
    TITLES_TABLE_FIELD_PLOT,
    TITLES_TABLE_FIELD_OPENING_CRAWL,
} from './_constants';
import type { QueryConfig } from 'pg';
import type { SelectOneInput, SelectAllInput } from '../../types';
import { countQuery, selectAllQuery, selectOneQuery } from '../../queries';

export const count = async (): Promise<QueryConfig> => countQuery(TITLES_TABLE_NAME);

export const selectAll = async (input: SelectAllInput): Promise<QueryConfig> =>
	selectAllQuery(input, TITLES_TABLE_NAME, [
        TITLES_TABLE_FIELD_ID,
        TITLES_TABLE_FIELD_TITLE,
        TITLES_TABLE_FIELD_LOGO,
        TITLES_TABLE_FIELD_TYPE,
        TITLES_TABLE_FIELD_POSTER,
        TITLES_TABLE_FIELD_RATING,
        TITLES_TABLE_FIELD_DURATION,
        TITLES_TABLE_FIELD_RELEASE_DATE,
        TITLES_TABLE_FIELD_GENRE,
        TITLES_TABLE_FIELD_RESUME,
        TITLES_TABLE_FIELD_DIRECTOR,
        TITLES_TABLE_FIELD_MUSIC_DIRECTOR,
        TITLES_TABLE_FIELD_PRODUCERS,
        TITLES_TABLE_FIELD_ACTORS,
        TITLES_TABLE_FIELD_PLOT,
        TITLES_TABLE_FIELD_OPENING_CRAWL,
	]);

export const selectOneById = async (input: SelectOneInput): Promise<QueryConfig> => {
    const selectOneQueryInput = {
        ...input,
        searchBy: TITLES_TABLE_FIELD_ID,
    };

    return selectOneQuery(selectOneQueryInput, TITLES_TABLE_NAME);
};

export const selectOneByTitle = async (input: SelectOneInput): Promise<QueryConfig> => {
    const selectOneQueryInput = {
        ...input,
        searchBy: TITLES_TABLE_FIELD_TITLE,
    };

    return selectOneQuery(selectOneQueryInput, TITLES_TABLE_NAME, [
        TITLES_TABLE_FIELD_ID,
        TITLES_TABLE_FIELD_TITLE,
        TITLES_TABLE_FIELD_LOGO,
        TITLES_TABLE_FIELD_TYPE,
        TITLES_TABLE_FIELD_POSTER,
        TITLES_TABLE_FIELD_RATING,
        TITLES_TABLE_FIELD_DURATION,
        TITLES_TABLE_FIELD_RELEASE_DATE,
        TITLES_TABLE_FIELD_GENRE,
        TITLES_TABLE_FIELD_RESUME,
        TITLES_TABLE_FIELD_DIRECTOR,
        TITLES_TABLE_FIELD_MUSIC_DIRECTOR,
        TITLES_TABLE_FIELD_PRODUCERS,
        TITLES_TABLE_FIELD_ACTORS,
        TITLES_TABLE_FIELD_PLOT,
        TITLES_TABLE_FIELD_OPENING_CRAWL,
    ]);
};
