import type { Nullable } from 'types';

export interface EraModel {
	id: number;
	name: string;
	image: string;
	description: string;
	titles: Nullable<EraModelTitle[]>;
}

export interface EraModelTitle {
	id: number;
	title: string;
	logo: string;
}
