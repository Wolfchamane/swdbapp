import type { Nullable } from '@swdbapp/types';

export interface CharacterDetails {
	birthYear: string;
	eyeColor: string;
	gender: string;
	hairColor: string;
	height: number;
	mass: number;
	skinColor: string;
	homeWorld: URL;
	films: URL[];
	species: URL[];
	starships: URL[];
	vehicles: URL[];
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
