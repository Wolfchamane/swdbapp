import type { Nullable } from '@swdbapp/types';

export type CharacterAlignment = 'jedi' | 'sith';

export interface CharacterFilm {
	title: string;
	releaseDate: Date;
}

export interface Character {
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
	films: Nullable<CharacterFilm>[];
	/* species: Specie[]; */
	/* starships: Starship[]; */
	/* vehicles: Vehicle[]; */
}

export interface PeopleListItem {
	$id: number;
	name: string;
	alignment: CharacterAlignment;
}
