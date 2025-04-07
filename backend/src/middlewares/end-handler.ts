import type { NextFunction, Request, Response } from 'express';
import type { AppError, AppResponse } from '../types/';
import { log } from '../log';

export const endHandler =
	() =>
	(err: AppError | AppResponse, req: Request, res: Response, next: NextFunction): void => {
		// console.log('[DEBUG] Request processed!');
		let message: string = err.message || 'Internal Server Error';
		res.statusCode = err.status || 500;

		if (res.statusCode !== 200) {
			message = JSON.stringify({
				status: res.statusCode,
				message,
			});
		}

		log('--> Response [%s]:\n\tstatusCode = %d\n\tmessage = %s', req.url, res.statusCode, message);

		res.end(message);
	};
