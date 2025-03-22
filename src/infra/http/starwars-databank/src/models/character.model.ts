import type { IndexedResource } from '../types';

export interface CharacterModel extends IndexedResource {
	name: string;
	description: string;
	image: string;
}
