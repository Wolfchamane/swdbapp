/* eslint-disable  @typescript-eslint/no-explicit-any */
import { type PeoplePorts } from './people.ports';
import { Character, type PeopleListItem } from './people.types';

export interface ListPeopleUseCaseInput {
	search?: string;
	page?: number;
}

export interface DescribePeopleUseCaseInput {
	id: string;
}

export interface PeopleUseCases {
	count: number;
	list(input: ListPeopleUseCaseInput): Promise<PeopleListItem[]>;
	describe(input: DescribePeopleUseCaseInput): Promise<Character>;
}

export class DefaultPeopleUseCases implements PeopleUseCases {
	count: number = 0;

	constructor(protected readonly ports: PeoplePorts) {}

	async list(input: ListPeopleUseCaseInput): Promise<PeopleListItem[]> {
		const response = await this.ports.list(input);

		this.count = response.count;
		return response.items;
	}

	async describe(input: DescribePeopleUseCaseInput): Promise<Character> {
		return await this.ports.describe(input);
	}
}
/* eslint-enable  @typescript-eslint/no-explicit-any */
