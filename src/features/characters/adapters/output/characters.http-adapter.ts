import type { CharacterModel, CharactersHttpClient } from '@swdbapp/infra-http-starwars-databank';
import type { PeopleHttpClient, PeopleListOutput, PeopleModel } from '@swdbapp/infra-http-swapi';
import type { Nullable } from '@swdbapp/types';
import type {
	CharactersDetailPortInput,
	CharactersListPortInput,
	CharactersListPortOutput,
	CharactersPorts,
} from '../../application';
import type { Character, CharacterDetails } from '../../types';

export class CharactersHttpAdapter implements CharactersPorts {
	constructor(
		private charactersHttpClient: CharactersHttpClient,
		private peopleHttpClient: PeopleHttpClient
	) {}

	private _mapPeopleInfraToApplicationCharacterDetails(item: PeopleModel): CharacterDetails {
		return {
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
			url: new URL(item.url),
			created: new Date(Date.parse(item.created)),
			edited: new Date(Date.parse(item.edited)),
		};
	}

	private async _extendCharacterDetails({ name }: CharacterModel): Promise<Nullable<CharacterDetails>> {
		const detailsResponse: PeopleListOutput | Error = await this.peopleHttpClient.list({ search: name });

		if (detailsResponse instanceof Error) {
			throw detailsResponse;
		}

		return detailsResponse.count === 1 && detailsResponse.results.length === 1
			? this._mapPeopleInfraToApplicationCharacterDetails(detailsResponse.results.pop())
			: null;
	}

	private _mapCharacterInfraToApplication(item: CharacterModel, details: Nullable<CharacterDetails>): Character {
		return {
			$id: item._id,
			$version: Number(item.__v),
			name: item.name,
			description: item.description,
			image: new URL(item.image),
			details,
		};
	}

	private async _mapCharactersInfraToApplication(items: CharacterModel[]): Promise<Character[]> {
		return items.map(item => this._mapCharacterInfraToApplication(item, null));
	}

	async list(input: CharactersListPortInput): Promise<CharactersListPortOutput<Character>> {
		const response = await this.charactersHttpClient.list(input);

		if (response instanceof Error) {
			throw response;
		}

		return {
			page: response.info.page,
			limit: response.info.limit,
			total: response.info.total,
			items: await this._mapCharactersInfraToApplication(response.data),
		};
	}

	async detail(input: CharactersDetailPortInput): Promise<Character> {
		const characterResponse: CharacterModel | Error = await this.charactersHttpClient.describe(input);
		let detailsResponse: Nullable<CharacterDetails> = null;
		if (characterResponse instanceof Error) {
			throw characterResponse;
		} else {
			detailsResponse = await this._extendCharacterDetails(characterResponse);
		}

		return this._mapCharacterInfraToApplication(characterResponse, detailsResponse);
	}
}
