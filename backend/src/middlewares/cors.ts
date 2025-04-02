import appConfiguration from '../config';
import type { Request, Response, NextFunction } from 'express';

export const cors =
	() =>
	(req: Request, res: Response, next: NextFunction): void => {
		res.setHeader('Access-Control-Allow-Origin', appConfiguration.allowOrigin);
		res.setHeader('Access-Control-Request-Method', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
		res.setHeader('Access-Control-Request-Headers', 'Accept, Content-Type');

		if (['OPTIONS'].includes(req.method)) {
			res.statusCode = 200;
		}

		next();
	};
