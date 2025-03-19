import type { ForceAlignment } from '@swdbapp/infra-http';
import type { Nullable } from '@swdbapp/types';

export type NotAvailable = 'n/a';
export type Unknown = 'unknown';

export interface CharacterFilm {
	$id: number;
	title: string;
	releaseDate: Date;
}

export interface CharacterHomeWorld {
	$id: number;
	name: string;
}

export type CharacterGender = 'male' | 'female' | Unknown | NotAvailable;

export interface Character {
	$id: number;
	birthYear: string;
	eyeColor: string | Unknown | NotAvailable;
	gender: CharacterGender;
	hairColor: string | Unknown | NotAvailable;
	height: number;
	homeWorld: Nullable<CharacterHomeWorld>;
	mass: number;
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
	alignment: ForceAlignment;
}
