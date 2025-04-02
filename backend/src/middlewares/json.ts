import type { Request, Response, NextFunction } from 'express';

export const json =
	() =>
	(req: Request, res: Response, next: NextFunction): void => {
		res.setHeader('Accept', 'application/json');
		res.setHeader('Content-Type', 'application/json');
		next();
	};
