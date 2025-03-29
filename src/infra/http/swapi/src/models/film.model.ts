import type { Resource } from '../types';

export interface FilmModel extends Resource {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    vehicles: string[];
    characters: string[];
    planets: string[];
}
