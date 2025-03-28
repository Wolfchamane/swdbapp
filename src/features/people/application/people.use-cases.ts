import type { PeoplePorts } from './people.ports';
import type { People } from '../types';
import type { Nullable } from '@swdbapp/types';

export interface PeopleListUseCaseInput {
    page?: number;
    search?: string;
}

export interface PeopleListUseCaseOutput {
    count: number;
    next: Nullable<URL>;
    previous: Nullable<URL>;
    results: People[];
}

export interface PeopleDescribeUseCaseInput {
    id: string;
}

export interface PeopleUseCases {
    list(input: PeopleListUseCaseInput): Promise<PeopleListUseCaseOutput>;
    describe(input: PeopleDescribeUseCaseInput): Promise<People>;
}

export class DefaultPeopleUseCases
    implements PeopleUseCases {

    constructor(private readonly ports: PeoplePorts) {}

    describe(input: PeopleDescribeUseCaseInput): Promise<People> {
        return this.ports.describe(input);
    }

    list(input: PeopleListUseCaseInput): Promise<PeopleListUseCaseOutput> {
        return this.ports.list(input);
    }
}
