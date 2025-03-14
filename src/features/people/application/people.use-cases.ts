/* eslint-disable  @typescript-eslint/no-explicit-any */
import { type PeoplePorts } from './people.ports';
import { type PeopleListItem } from './people.types';

export interface ListPeopleUseCaseInput {
	search?: string;
	page?: number;
}

export interface PeopleUseCases {
	count: number;
	list(input: ListPeopleUseCaseInput): Promise<PeopleListItem[]>;
}

export class DefaultPeopleUseCases implements PeopleUseCases {
	count: number = 0;

	constructor(protected readonly ports: PeoplePorts) {}

	async list(input: ListPeopleUseCaseInput): Promise<PeopleListItem[]> {
		const response = await this.ports.list(input);

		this.count = response.count;
		return response.items;
	}
}
/* eslint-enable  @typescript-eslint/no-explicit-any */
