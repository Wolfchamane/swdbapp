/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	type FilmsHttpClient,
	type Film as InfraFilm,
	type People as InfraPeople,
	type ListOutput,
	type PeopleHttpClient,
	mapPeopleAlignment,
} from '@swdbapp/infra-http';
import { isoStrToDate } from '@swdbapp/utils';
import {
	Character,
	CharacterFilm,
	DescribePeoplePortInput,
	ListPeoplePortInput,
	ListPeoplePortOutput,
	PeopleListItem,
	PeoplePorts,
} from '../../application';

export class PeopleHttpAdapter implements PeoplePorts {
	constructor(
		private readonly peopleHttpClient: PeopleHttpClient,
		private readonly filmsHttpClient: FilmsHttpClient
	) {}

	private _mapInfraToApplicationPeopleListItem(item: InfraPeople): PeopleListItem {
		const $id: number = Number(item.url.replace(/.+\/(\d+)\/$/, '$1'));

		return {
			$id,
			name: item.name,
			alignment: mapPeopleAlignment(item),
		};
	}

	async list(input: ListPeoplePortInput): Promise<ListPeoplePortOutput> {
		const response: ListOutput<InfraPeople> | Error = await this.peopleHttpClient.list(input);

		if (response instanceof Error) {
			throw response;
		}

		return {
			count: response.count,
			next: response.next ? new URL(response.next) : undefined,
			previous: response.previous ? new URL(response.previous) : undefined,
			items: response.results.map(this._mapInfraToApplicationPeopleListItem.bind(this)),
		};
	}

	private _mapInfraInfoToApplicationFilm(film: InfraFilm | Error, index: number): CharacterFilm {
		if (film instanceof Error) {
			throw film;
		}

		return {
			$id: index++,
			title: film.title,
			releaseDate: new Date(Date.parse(film.release_date)),
		};
	}

	private async _obtainCharacterFilms(films: string[]): Promise<CharacterFilm[]> {
		const responses = [];
		for (const film of films) {
			const id: string = film.replace(/.+\/(\d+)\/$/, '$1');
			responses.push(await this.filmsHttpClient.describe({ id }));
		}

		return responses.map(this._mapInfraInfoToApplicationFilm.bind(this));
	}

	private async _mapInfraPeopleToApplicationCharacter(item: InfraPeople | Error, id: string): Promise<Character> {
		if (item instanceof Error) {
			throw item;
		}

		return {
			$id: Number(id),
			birthYear: item.birth_year,
			eyeColor: item.eye_color,
			gender: item.gender,
			hairColor: item.hair_color,
			height: Number(item.height),
			homeWorld: null,
			mass: Number(item.mass),
			name: item.name,
			skinColor: item.skin_color,
			created: isoStrToDate(item.created),
			edited: isoStrToDate(item.edited),
			url: new URL(item.url),
			films: await this._obtainCharacterFilms(item.films),
		};
	}

	async describe({ id }: DescribePeoplePortInput): Promise<Character> {
		return this._mapInfraPeopleToApplicationCharacter(await this.peopleHttpClient.describe({ id }), id);
	}
}
/* eslint-enable @typescript-eslint/no-unused-vars */
