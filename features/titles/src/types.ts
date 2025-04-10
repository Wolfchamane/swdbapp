import type { Nullable } from '@swdbapp/types';

export type TitleType = 'films' | 'series' | 'game-apps';
export const TITLE_TYPES: Record<string, TitleType> = {
	FILMS: 'films',
	SERIES: 'series',
	GAME_APPS: 'game-apps',
};

export interface Title {
	$id: number;
	title: string;
	logo: URL;
}

export interface TitleDetails extends Title {
	type: Nullable<TitleType>;
	poster: Nullable<URL>;
	rating: Nullable<string>;
	duration: Nullable<number>;
	releaseDate: Nullable<Date>;
	genre: Nullable<string[]>;
	resume: Nullable<string>;
	director: Nullable<string>;
	musicDirector: Nullable<string>;
	producers: Nullable<string[]>;
	actors: Nullable<string[]>;
	plot: Nullable<string>;
	openingCrawl: Nullable<string>;
}
