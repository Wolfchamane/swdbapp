import type { Request, Response, NextFunction } from 'express';
import { log } from '../log';

export const json =
	() =>
	(req: Request, res: Response, next: NextFunction): void => {
		if (req.method !== 'OPTIONS') {
			log('<-- [Middleware: JSON] %s: %s', req.method, req.url);
		}
		res.setHeader('Accept', 'application/json');
		res.setHeader('Content-Type', 'application/json');
		next();
	};
