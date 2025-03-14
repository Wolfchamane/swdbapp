/* eslint-disable  @typescript-eslint/no-explicit-any */
import { type PeoplePorts } from './people.ports';

export interface PeopleUseCases {
	list(): Promise<any>;
}

export class DefaultPeopleUseCases implements PeopleUseCases {
	constructor(protected readonly ports: PeoplePorts) {}

	list(): Promise<any> {
		return this.ports.list({});
	}
}
/* eslint-enable  @typescript-eslint/no-explicit-any */
