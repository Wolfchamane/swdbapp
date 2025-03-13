import { type PeoplePorts } from './people.ports';
import { type People } from './people.types';

export interface PeopleUseCases {
	list(): Promise<any>;
}

export class DefaultPeopleUseCases implements PeopleUseCases {
	constructor(protected readonly ports: PeoplePorts) {}

	list(): Promise<any> {
		return this.ports.list({});
	}
}
