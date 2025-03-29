import type { CharacterModel, CharactersHttpClient } from '@swdbapp/infra-http-starwars-databank';
import type { Nullable } from '@swdbapp/types';
import type { CharactersDetailPortInput, CharactersListPortInput, CharactersListPortOutput, CharactersPorts } from '../../application';
import type { Character, CharacterDetails } from '../../types';

export class CharactersHttpAdapter implements CharactersPorts {
	constructor(
		private charactersHttpClient: CharactersHttpClient,
	) {}

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
		if (characterResponse instanceof Error) {
			throw characterResponse;
		}

		return this._mapCharacterInfraToApplication(characterResponse, null);
	}
}
