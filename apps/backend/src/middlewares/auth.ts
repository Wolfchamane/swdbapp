import config from '../config';
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';
import type { Logger } from '@swdbapp/utils-backend';

export const auth =
	(logger: Logger) =>
	(req: Request, res: Response, next: NextFunction): void => {
		if (['OPTIONS'].includes(req.method)) {
			res.statusCode = 200;
			next();
		} else {
			logger.log('<-- [Middleware: Auth] %s: %s', req.method, req.url);
			const apiKeyHeaderName: string = 'x-api-key';
			const apiKeyValue: string = `${config.apiKey}`;

			const apiHeader = req.get(apiKeyHeaderName);
			if (!apiHeader && apiHeader !== apiKeyValue) {
				logger.error('NOT AUTHORIZED!');
				next({ status: 401, message: 'Unauthorized' } as AppError);
			} else {
				logger.log('<-- Authorized');
				next();
			}
		}
	};
