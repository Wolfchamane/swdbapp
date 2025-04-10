import type { ListInput, ListOutput, DescribeInput } from '@swdbapp/infra-http';
import type { Title, TitleDetails } from '../types';

export interface TitlesPorts {
	list(input?: TitlesListPortInput): Promise<TitlesListPortOutput>;
	detail(input: TitleDetailPortInput): Promise<TitleDetailPortOutput>;
}

export type TitlesListPortInput = ListInput<Title>;
export type TitlesListPortOutput = ListOutput<Title>;
export type TitleDetailPortInput = DescribeInput;
export type TitleDetailPortOutput = TitleDetails;
