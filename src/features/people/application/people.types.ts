import type { Nullable } from '@swdbapp/types';

export interface Film {
	title: string;
	releaseDate: Date;
}

export interface People {
	birthYear: string;
	eyeColor: string;
	gender: string;
	hairColor: string;
	height: string;
	homeWorld: string;
	mass: string;
	name: string;
	skinColor: string;
	created: Date;
	edited: Date;
	url: URL;
	films: Nullable<Film>[];
	/* species: Specie[]; */
	/* starships: Starship[]; */
	/* vehicles: Vehicle[]; */
}
