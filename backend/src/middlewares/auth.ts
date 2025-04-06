import config from '../config';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

export const auth =
	() =>
	(req: Request, res: Response, next: NextFunction): void => {
		if (['OPTIONS'].includes(req.method)) {
			res.statusCode = 200;
			next();
		} else {
			const apiKeyHeaderName: string = 'x-api-key';
			const apiKeyValue: string = `${config.apiKey}`;

			const apiHeader = req.get(apiKeyHeaderName);
			if (!apiHeader && apiHeader !== apiKeyValue) {
				next({ status: 401, message: 'Unauthorized' } as AppError);
			} else {
				next();
			}
		}
	};
