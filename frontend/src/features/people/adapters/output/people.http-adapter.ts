import type { PeopleHttpClient, PeopleListOutput, PeopleModel } from '@swdbapp/infra-http-swapi';
import { strToURL } from '@swdbapp/utils';
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
			films: item.films.map(str => strToURL(str) || str),
			species: item.species.map(str => strToURL(str) || str),
			starships: item.starships.map(str => strToURL(str) || str),
			vehicles: item.vehicles.map(str => strToURL(str) || str),
			created: new Date(Date.parse(item.created)),
			edited: new Date(Date.parse(item.edited)),
			url: strToURL(item.url),
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
