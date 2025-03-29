import type { Nullable } from '@swdbapp/types';

export type Unknown = 'unknown';
export type NotAvailable = 'n/a';

export type PeopleGender = 'Male' | 'Female' | Unknown | NotAvailable;

export interface People {
	$id: string;
	birthYear: string | Unknown | NotAvailable;
	created: Date;
	edited: Date;
	eyeColor: string;
	gender: PeopleGender;
	hairColor: string | Unknown | NotAvailable;
	height: number;
	homeWorld: URL;
	mass: number;
	name: string;
	skinColor: string;
    films: (URL|string)[];
	species: (URL|string)[];
	starships: (URL|string)[];
	vehicles: (URL|string)[];
    url: Nullable<URL>;
}
