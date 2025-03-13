import type {
	FilmsHttpClient,
	Film as InfraFilm,
	People as InfraPeople,
	ListOutput,
	PeopleHttpClient,
} from '@swdbapp/infra-http';
import type {
	DescribePeoplePortInput,
	Film,
	ListPeoplePortInput,
	ListPeoplePortOutput,
	Nullable,
	People,
	PeoplePorts,
} from '../../application';

export class PeopleHttpAdapter implements PeoplePorts {
	constructor(
		private readonly peopleHttpClient: PeopleHttpClient,
		private readonly filmsHttpClient: FilmsHttpClient
	) {}

	private _mapInfraToApplicationFilm(item: InfraFilm): Film {
		return {
			title: item.title,
			releaseDate: new Date(Date.parse(item.release_date)),
		};
	}

	private async _resolveFilmInPeople(film: string): Promise<Film | null> {
		const id: string = film.replace(/.+(\d+)\/$/, '$1');
		const response: InfraFilm | Error = await this.filmsHttpClient.describe({ id });
		return response instanceof Error ? null : this._mapInfraToApplicationFilm(response);
	}

	private async _mapInfraToApplicationPeople(item: InfraPeople): Promise<People> {
		let films: Nullable<Film>[] = [];
		for (const film of item.films) {
			films.push(await this._resolveFilmInPeople(film));
		}

		return {
			birthYear: item.birth_year,
			eyeColor: item.eye_color,
			gender: item.gender,
			hairColor: item.hair_color,
			height: item.height,
			homeWorld: item.homeworld,
			mass: item.mass,
			name: item.name,
			skinColor: item.skin_color,
			created: new Date(Date.parse(item.created)),
			edited: new Date(Date.parse(item.edited)),
			url: new URL(item.url),
			films,
		};
	}

	async list(input: ListPeoplePortInput): Promise<ListPeoplePortOutput> {
		const response: ListOutput<InfraPeople> | Error = await this.peopleHttpClient.list(input);

		if (response instanceof Error) {
			throw response;
		}

		let items: People[] = [];
		for (const result of response.results) {
			items.push(await this._mapInfraToApplicationPeople(result));
		}

		return {
			count: response.count,
			next: response.next ? new URL(response.next) : undefined,
			previous: response.previous ? new URL(response.previous) : undefined,
			items,
		};
	}

	describe(input: DescribePeoplePortInput): Promise<People> {
		return Promise.resolve({} as People);
	}
}
