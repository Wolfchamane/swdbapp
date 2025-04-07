import config from '../config';
import cors, { type CorsOptions } from 'cors';
import { debug } from '../log';

export default () => {
	const options: CorsOptions = {
		allowedHeaders: ['accept', 'content-type', 'x-api-key'],
		methods: ['options', 'get', 'post', 'put', 'patch', 'delete'],
		origin: config.allowOrigin,
		optionsSuccessStatus: 200,
		preflightContinue: true,
	};

	debug('CORS Middleware with options: %s', JSON.stringify(options));

	return cors(options);
};
