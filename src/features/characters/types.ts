import type { Nullable } from '@swdbapp/types';

export interface CharacterFilm {
    title: string;
    releaseDate: Date;
    episodeNumber: string;
    image: string;
}

export interface CharacterDetails {
	birthYear: string;
	eyeColor: string;
	gender: string;
	hairColor: string;
	height: number;
	mass: number;
	skinColor: string;
	homeWorld: URL;
	films: CharacterFilm[];
	species: (URL|string)[];
	starships: (URL|string)[];
	vehicles: (URL|string)[];
	created: Date;
	edited: Date;
	url: URL;
}

export interface Character {
	$id: string;
	$version: number;
	name: string;
	description: string;
	image: URL;
	details: Nullable<CharacterDetails>;
}
