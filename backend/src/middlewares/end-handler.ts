import type { NextFunction, Request, Response } from 'express';
import type { AppError, AppResponse } from '../types/';

export const endHandler =
	() =>
	(err: AppError | AppResponse, req: Request, res: Response, next: NextFunction): void => {
		res.statusCode = err.status || 500;
		if (res.statusCode === 200) {
			res.end(err.message);
		} else {
			res.end(
				JSON.stringify({
					status: err.status,
					message: err.message || 'Internal Server Error',
				})
			);
		}
	};
