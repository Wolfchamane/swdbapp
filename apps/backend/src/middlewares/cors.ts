import config from '../config';
import cors, { type CorsOptions } from 'cors';
import type { Logger } from '@swdbapp/utils-backend';

export default (logger: Logger) => {
	const options: CorsOptions = {
		allowedHeaders: ['accept', 'content-type', 'x-api-key'],
		methods: ['options', 'get', 'post', 'put', 'patch', 'delete'],
		origin: config.allowOrigin,
		optionsSuccessStatus: 200,
		preflightContinue: true,
	};

	logger.debug('CORS Middleware with options: %s', JSON.stringify(options));

	return cors(options);
};
