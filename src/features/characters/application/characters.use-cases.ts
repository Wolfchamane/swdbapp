import type { Character } from '../types';
import type { CharactersPorts } from './characters.ports';
import type { PeopleInputAdapter, PeopleAdapterListOutput } from '@swdbapp/people';
import {FilmsInputAdapter, Film, listExtendedFilmsByItem} from '@swdbapp/films';
import { numberToRoman } from '@swdbapp/utils';

export interface CharactersListUseCaseInput {
	page?: number;
	limit?: number;
}

export interface CharactersListUseCaseOutput<T> {
	page: number;
	limit: number;
	total: number;
	items: T[];
}

export interface CharactersDetailUseCasesInput {
	id: string;
}

export interface CharactersUseCases {
	list(input: CharactersListUseCaseInput): Promise<CharactersListUseCaseOutput<Character>>;
	info(input: CharactersDetailUseCasesInput): Promise<Character>;
    detail(character: Character): Promise<void>;
}

export class DefaultCharactersUseCases implements CharactersUseCases {
	constructor(
        private ports: CharactersPorts,
        private peopleAdapter: PeopleInputAdapter,
        private filmsAdapter: FilmsInputAdapter) {}

	async list(input: CharactersListUseCaseInput): Promise<CharactersListUseCaseOutput<Character>> {
		return this.ports.list(input);
	}

	async info({ id }: CharactersDetailUseCasesInput): Promise<Character> {
		return this.ports.detail({ id });
	}

    async detail(character: Character): Promise<void> {
        const peopleResponse: PeopleAdapterListOutput = await this.peopleAdapter.list({ search: character.name });
        if (peopleResponse.count === 1) {
            const { films, ...rest } = peopleResponse.results.pop();
            character.details = { ...rest, films: [] };

            const rawFilmsData: Film[] = [];
            for (const film of films) {
                if (film) {
                    const idPattern: RegExp =  /.+\/films\/(\d+)\/?$/;
                    const filmId: string =
                        film instanceof URL
                            ? film.href.replace(idPattern, '$1')
                            : (film as string).replace(idPattern, '$1');
                    const filmDetail: Film|Error = await this.filmsAdapter.describe({ id: filmId });

                    if (filmDetail instanceof Error) {
                        throw filmDetail;
                    }

                    rawFilmsData.push(filmDetail);
                }
            }

            rawFilmsData.push(...listExtendedFilmsByItem(character.name));
            character.details.films = rawFilmsData.map(data => ({
                title: data.title,
                releaseDate: data.releaseDate,
                episodeNumber: numberToRoman(data.episodeId),
                image: data.image,
            }));
        }
    }
}
