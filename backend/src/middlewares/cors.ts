import config from '../config';
// import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';

export default () =>
	cors({
		allowedHeaders: ['accept', 'content-type', 'x-api-key'],
		methods: ['options', 'get', 'post', 'put', 'patch', 'delete'],
		origin: config.allowOrigin,
		optionsSuccessStatus: 200,
		preflightContinue: true,
	});
