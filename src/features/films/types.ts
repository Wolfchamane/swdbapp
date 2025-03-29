import type { Nullable } from '@swdbapp/types';

export interface Film {
	$id: string;
	title: string;
	image: string;
	episodeId: number;
	openingCrawl: string;
	director: string;
	producer: string;
	releaseDate: Date;
	species: (URL | string)[];
	starships: (URL | string)[];
	vehicles: (URL | string)[];
	characters: (URL | string)[];
	planets: (URL | string)[];
	created: Date;
	edited: Date;
	url: Nullable<URL>;
}
