import config from '../config';
import type { Request, Response, NextFunction } from 'express';
import type { Logger, AppError } from '@swdbapp/utils-backend';

export const auth =
	(logger: Logger) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const isOptionsRequest: boolean = ['OPTIONS'].includes(req.method);
		const isHealthEndpoint: boolean = /health/gi.test(req.url);
		if (isOptionsRequest || isHealthEndpoint) {
			logger.info('--> OK');
			res.statusCode = 200;
			res.end();
		} else {
			logger.log('<-- [Middleware: Auth] %s: %s', req.method, req.url);
			const apiKeyHeaderName: string = 'x-api-key';
			const apiKeyValue: string = `${config.apiKey}`;

			const apiHeader: string | undefined = req.get(apiKeyHeaderName);
			const apiHeaderIsValid: boolean = apiHeader === apiKeyValue;
			if (apiHeaderIsValid) {
				logger.log('<-- Authorized');
				next();
			} else {
				logger.error('NOT AUTHORIZED!');
				next({ status: 401, message: 'Unauthorized' } as AppError);
			}
		}
	};
