import type { NotAvailable, Resource, Unknown } from '../types';

export type PeopleEyeColor = string | Unknown | NotAvailable;
export type PeopleHairColor = string | Unknown | NotAvailable;
export type PeopleGender = 'Male' | 'Female' | Unknown | NotAvailable;

export interface PeopleModel extends Resource {
	name: string;
	birth_year: string;
	eye_color: PeopleEyeColor;
	gender: PeopleGender;
	hair_color: PeopleHairColor;
	height: string;
	mass: string;
	skin_color: string;
	homeworld: string;
	films: string[];
	species: string[];
	starships: string[];
	vehicles: string[];
}
