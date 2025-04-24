import type { EraModel } from '@swdbapp/feature-eras-infra-http';
import type { DescribeInput, ListInput, ListOutput } from '@swdbapp/types';
import type { Era, EraDetails } from '../types';

export interface ErasPorts {
	list(input?: ErasListPortInput): Promise<ErasListPortOutput>;
	describe(input: ErasDescribePortInput): Promise<ErasDescribePortOutput>;
}

export type ErasListPortInput = ListInput<EraModel>;
export type ErasListPortOutput = ListOutput<Era>;
export type ErasDescribePortInput = DescribeInput;
export type ErasDescribePortOutput = EraDetails;
