export type TitleModelType = 'films' | 'games-apps' | 'series';

export interface TitleModel {
	id: number;
	title: string;
	logo: string;
	type: TitleModelType;
	poster: string;
	rating: string;
	duration: string;
	release_date: string;
	genre: string;
	resume: string;
	director: string;
	music_director: string;
	producers: string;
	actors: string;
	plot: string;
	opening_crawl: string;
}
