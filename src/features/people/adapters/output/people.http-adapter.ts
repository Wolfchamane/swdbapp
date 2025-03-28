import type { PeopleHttpClient, PeopleListOutput, PeopleModel } from '@swdbapp/infra-http-swapi';
import type {
	PeopleDescribePortInput,
	PeopleListPortInput,
	PeopleListPortOutput,
	PeoplePorts,
} from '../../application';
import type { People } from '../../types';

export class PeopleHttpAdapter implements PeoplePorts {
	constructor(private readonly httpClient: PeopleHttpClient) {}

	private _mapPeopleInfraToApplication(item: PeopleModel | Error, index?: string | number): People {
		if (item instanceof Error) {
			throw item;
		}

		return {
			$id: `${index}`,
			name: item.name,
			birthYear: item.birth_year,
			eyeColor: item.eye_color,
			gender: item.gender,
			hairColor: item.hair_color,
			height: Number(item.height),
			mass: Number(item.mass),
			skinColor: item.skin_color,
			homeWorld: new URL(item.homeworld),
			films: item.films.map(film => new URL(film)),
			species: item.species.map(specie => new URL(specie)),
			starships: item.starships.map(starship => new URL(starship)),
			vehicles: item.vehicles.map(vehicle => new URL(vehicle)),
			created: new Date(Date.parse(item.created)),
			edited: new Date(Date.parse(item.edited)),
			url: new URL(item.url),
		};
	}

	async describe({ id }: PeopleDescribePortInput): Promise<People> {
		return this._mapPeopleInfraToApplication(await this.httpClient.describe({ id }), id);
	}

	async list(input: PeopleListPortInput): Promise<PeopleListPortOutput> {
		const response: PeopleListOutput | Error = await this.httpClient.list(input);
		if (response instanceof Error) {
			throw response;
		}

		return {
			...response,
			next: response.next ? new URL(response.next) : null,
			previous: response.previous ? new URL(response.previous) : null,
			results: response.results.map(this._mapPeopleInfraToApplication.bind(this)),
		};
	}
}
