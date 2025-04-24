import type { DescribeInput, EraModel, ListInput, ListOutput } from '@swdbapp/infra-http';
import type { Era, EraDetails } from '../types';

export interface ErasPorts {
	list(input?: ErasListPortInput): Promise<ErasListPortOutput>;
	describe(input: ErasDescribePortInput): Promise<ErasDescribePortOutput>;
}

export type ErasListPortInput = ListInput<EraModel>;
export type ErasListPortOutput = ListOutput<Era>;
export type ErasDescribePortInput = DescribeInput;
export type ErasDescribePortOutput = EraDetails;
