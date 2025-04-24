import type { NextFunction, Request, Response } from 'express';
import type { AppError, AppResponse } from '../types/';
import type { Logger } from '@swdbapp/utils-backend';

export const endHandler =
	(logger: Logger) =>
	(err: AppError | AppResponse, req: Request, res: Response, _: NextFunction): void => {
		let message: string = err.message || 'Internal Server Error';
		res.statusCode = err.status || 500;

		if (res.statusCode !== 200) {
			message = JSON.stringify({
				status: res.statusCode,
				message,
			});
		}

		logger.log('--> Response [%s]:\n\tstatusCode = %d\n\tmessage = %s', req.url, res.statusCode, message);

		res.end(message);
	};
