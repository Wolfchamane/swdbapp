import type { Nullable } from '@swdbapp/types';
import type { PeopleUseCases } from '../../application';
import type { People } from '../../types';
import {providePeopleUseCases} from "../../graph";

export interface PeopleAdapterListInput {
	page?: number;
	search?: string;
}

export interface PeopleAdapterListOutput {
	count: number;
	next: Nullable<URL>;
	previous: Nullable<URL>;
	results: People[];
}

export interface PeopleAdapterDescribeInput {
	id: string;
}

export interface PeopleInputAdapter {
	list(input: PeopleAdapterListInput): Promise<PeopleAdapterListOutput>;
	describe(input: PeopleAdapterDescribeInput): Promise<People>;
}

export class DefaultPeopleInputAdapter implements PeopleInputAdapter {
	constructor(private readonly useCases: PeopleUseCases) {}

	describe(input: PeopleAdapterDescribeInput): Promise<People> {
		return this.useCases.describe(input);
	}

	list(input: PeopleAdapterListInput): Promise<PeopleAdapterListOutput> {
		return this.useCases.list(input);
	}
}


export const providePeopleInputAdapter = (): PeopleInputAdapter =>
    new DefaultPeopleInputAdapter(providePeopleUseCases());
