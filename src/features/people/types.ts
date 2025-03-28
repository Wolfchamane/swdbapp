export type Unknown = 'unknown';
export type NotAvailable = 'n/a';

export type PeopleGender = 'Male' | 'Female' | Unknown | NotAvailable;

export interface People {
    $id: string;
    birthYear: string | Unknown | NotAvailable;
    created: Date;
    edited: Date;
    eyeColor: string;
    films: URL[];
    gender: PeopleGender;
    hairColor: string | Unknown | NotAvailable;
    height: number;
    homeWorld: URL;
    mass: number;
    name: string;
    skinColor: string;
    species: URL[];
    starships: URL[];
    url: URL;
    vehicles: URL[];
}
