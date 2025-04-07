import config from '../config';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';
import { log, error } from '../log';

export const auth =
	() =>
	(req: Request, res: Response, next: NextFunction): void => {
		if (['OPTIONS'].includes(req.method)) {
			res.statusCode = 200;
			next();
		} else {
            log('<-- [Middleware: Auth] %s: %s', req.method, req.url);
			const apiKeyHeaderName: string = 'x-api-key';
			const apiKeyValue: string = `${config.apiKey}`;

			const apiHeader = req.get(apiKeyHeaderName);
			if (!apiHeader && apiHeader !== apiKeyValue) {
				error('NOT AUTHORIZED!');
				next({ status: 401, message: 'Unauthorized' } as AppError);
			} else {
                log('<-- Authorized');
				next();
			}
		}
	};
