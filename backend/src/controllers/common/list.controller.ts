import type { NextFunction, Request, Response } from 'express';
import { log, debug, error } from '../../log';
import { DEFAULT_LIMIT, DEFAULT_ORDER_BY, DEFAULT_ORDER_DIR, DEFAULT_OFFSET } from '../../constants';
import type { AppError, AppResponse, SelectAllInput } from '../../types';
import type { ListOutput } from '@swdbapp/infra-http';

export interface ListControllerInput<T> {
	req: Request;
	res: Response;
	next: NextFunction;
	queryAll(input: SelectAllInput): Promise<T[]>;
	queryCount(): Promise<number>;
}

export const listController = async <T>({ req, next, queryAll, queryCount }: ListControllerInput<T>): Promise<void> => {
	log('<-- Handling: [%s] %s', req.method, req.url);

	const limit: string = `${req.query?.limit || DEFAULT_LIMIT}`;
	const offset: string = `${
		req?.query.limit && req?.query.offset
			? `${Number(Number(req.query.offset) * Number(req.query.limit))}`
			: DEFAULT_OFFSET
	}`;
	const orderBy: string = `${req.query?.orderBy || DEFAULT_ORDER_BY}`;
	const orderDir: string = `${req.query?.orderDir || DEFAULT_ORDER_DIR}`;
	const searchBy: string = `${req.query?.searchBy || ''}`;
	const search: string = `${req.query?.search || ''}`;

	try {
		const selectAllInput: SelectAllInput = { limit, orderBy, orderDir, searchBy, search, offset };
		debug('select all input: %s', JSON.stringify(selectAllInput));

		const items: T[] = await queryAll(selectAllInput);
		const total: number = await queryCount();

		const listOutput: ListOutput<T> = {
			offset: Number(offset),
			limit: Number(limit),
			total,
			items,
		};

		if (!total) {
			error('No items found!');
		}

		next({
			status: 200,
			message: JSON.stringify(listOutput),
		} as AppResponse);
	} catch (e: unknown) {
		error((e as Error).message);
		next(e as AppError);
	}
};
