import type { NextFunction, Request, Response } from 'express';
import type { AppError, AppResponse } from '../types/';

export const endHandler =
	() =>
	(err: AppError | AppResponse, req: Request, res: Response, next: NextFunction): void => {
		// console.log('[DEBUG] Request processed!');
		const message: string = err.message || 'Internal Server Error';
		res.statusCode = err.status || 500;

		switch (res.statusCode) {
			case 200:
				res.end(message);
				break;
			default:
				// console.log(`[${res.statusCode}] ${message}`);
				res.end(
					JSON.stringify({
						status: res.statusCode,
						message,
					})
				);
				break;
		}
	};
