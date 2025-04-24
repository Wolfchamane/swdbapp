import type { Request, Response, NextFunction } from 'express';
import type { Logger } from '@swdbapp/utils-backend';

export const json =
	(logger: Logger) =>
	(req: Request, res: Response, next: NextFunction): void => {
		if (req.method !== 'OPTIONS') {
			logger.log('<-- [Middleware: JSON] %s: %s', req.method, req.url);
		}
		res.setHeader('Accept', 'application/json');
		res.setHeader('Content-Type', 'application/json');
		next();
	};
