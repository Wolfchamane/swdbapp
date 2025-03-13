import type { People } from './people.types';

export interface DescribePeoplePortInput {
	id: string;
}

export interface ListPeoplePortInput {
	search?: string;
	page?: number;
}

export interface ListPeoplePortOutput {
	count: number;
	next?: URL;
	previous?: URL;
	items: People[];
}

export interface PeoplePorts {
	list(input: ListPeoplePortInput): Promise<ListPeoplePortOutput>;
	describe(input: DescribePeoplePortInput): Promise<People>;
}
