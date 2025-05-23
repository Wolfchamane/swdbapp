import type { Nullable } from '@swdbapp/types';

export interface Era {
	$id: number;
	name: string;
	logo: URL;
}

export interface EraDetailsTitle {
	$id: number;
	title: string;
	logo: URL;
	order: number;
}

export interface EraDetails extends Era {
	description: string;
	titles: Nullable<EraDetailsTitle[]>;
}
