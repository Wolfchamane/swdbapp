import type { ListInput, ListOutput, DescribeInput, EraModel } from '@swdbapp/infra-http';
import type { Era } from '../types';

export interface ErasPorts {
    list(input?: ErasListPortInput): Promise<ErasListPortOutput>;
    describe(input: ErasDescribePortInput): Promise<ErasDescribePortOutput>;
}

export type ErasListPortInput = ListInput<EraModel>;
export type ErasListPortOutput = ListOutput<Era>;
export type ErasDescribePortInput = DescribeInput;
export type ErasDescribePortOutput = Era;
