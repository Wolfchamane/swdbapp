import type { CharacterModel, CharactersHttpClient } from '@swdbapp/infra-http';
import type { CharactersListPortInput, CharactersListPortOutput, CharactersPorts } from '../../application';
import type { Character } from '../../types';

export class CharactersHttpAdapter implements CharactersPorts {
	constructor(private httpClient: CharactersHttpClient) {}

	private _mapCharacterInfraToApplication(item: CharacterModel): Character {
		return {
			$id: Number(item._id),
			$version: Number(item.__v),
			name: item.name,
			description: item.description,
			image: new URL(item.image),
		};
	}

	async list(input: CharactersListPortInput): Promise<CharactersListPortOutput<Character>> {
		const response = await this.httpClient.list(input);

		if (response instanceof Error) {
			throw response;
		}

		return {
			page: response.info.page,
			limit: response.info.limit,
			total: response.info.total,
			items: response.data.map(this._mapCharacterInfraToApplication.bind(this)),
		};
	}
}
