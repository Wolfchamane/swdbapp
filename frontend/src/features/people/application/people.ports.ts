import type { Nullable } from '@swdbapp/types';
import type { People } from '../types';

export interface PeoplePorts {
	list(input: PeopleListPortInput): Promise<PeopleListPortOutput>;
	describe(input: PeopleDescribePortInput): Promise<People>;
}

export interface PeopleListPortInput {
	page?: number;
	search?: string;
}

export interface PeopleListPortOutput {
	count: number;
	next: Nullable<URL>;
	previous: Nullable<URL>;
	results: People[];
}

export interface PeopleDescribePortInput {
	id: string;
}
