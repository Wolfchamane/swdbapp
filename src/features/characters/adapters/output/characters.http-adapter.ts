import type { CharacterModel, CharactersHttpClient } from '@swdbapp/infra-http-starwars-databank';
import type { People, PeopleAdapterListOutput, PeopleInputAdapter } from '@swdbapp/people';
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
		private peopleInputAdapter: PeopleInputAdapter
	) {}

	private _mapPeopleInfraToApplicationCharacterDetails(item: People): CharacterDetails {
		return {
			birthYear: item.birthYear,
			eyeColor: item.eyeColor,
			gender: item.gender,
			hairColor: item.hairColor,
			height: item.height,
			mass: item.mass,
			skinColor: item.skinColor,
			homeWorld: item.homeWorld,
			films: item.films,
			species: item.species,
			starships: item.starships,
			vehicles: item.vehicles,
			created: item.created,
			edited: item.edited,
			url: item.url,
		};
	}

	private async _extendCharacterDetails({ name }: CharacterModel): Promise<Nullable<CharacterDetails>> {
		const detailsResponse: PeopleAdapterListOutput | Error = await this.peopleInputAdapter.list({
			search: name.toLowerCase(),
		});

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
