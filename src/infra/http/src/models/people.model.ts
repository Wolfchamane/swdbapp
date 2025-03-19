export type { UnknownField, NotAvailable } from '../types';

export type PeopleGender = 'male' | 'female' | UnknownField | NotAvailable;

export interface People {
	birth_year: string;
	eye_color: string;
	films: string[];
	gender: PeopleGender;
	hair_color: string | UnknownField | NotAvailable;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	created: string;
	edited: string;
	species: string[];
	starships: string[];
	url: string;
	vehicles: string[];
}
