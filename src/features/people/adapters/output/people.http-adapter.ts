/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FilmsHttpClient, People as InfraPeople, ListOutput, PeopleHttpClient } from '@swdbapp/infra-http';
import type {
	Character,
	DescribePeoplePortInput,
	ListPeoplePortInput,
	ListPeoplePortOutput,
	PeopleListItem,
	PeoplePorts,
} from '../../application';

export class PeopleHttpAdapter implements PeoplePorts {
	constructor(
		private readonly peopleHttpClient: PeopleHttpClient,
		private readonly _: FilmsHttpClient
	) {}

	private _mapInfraToApplicationPeopleListItem(item: InfraPeople): PeopleListItem {
		const $id: number = Number(item.url.replace(/.+\/(\d+)$/, '$1'));

		return {
			$id,
			name: item.name,
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

	describe(_: DescribePeoplePortInput): Promise<Character> {
		return Promise.resolve({} as Character);
	}
}
/* eslint-enable @typescript-eslint/no-unused-vars */
