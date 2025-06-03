import { type LoggerLevel, LOGGER_LEVELS } from '@swdbapp/utils-backend';

export interface AppConfiguration {
	allowOrigin: string;
	port: number;
	apiKey: string;
	logLevel: LoggerLevel;
}

const configuration: AppConfiguration = {
	allowOrigin: `${process.env.BACKEND_ACCEPT_ORIGIN}`,
	port: Number(process.env.BACKEND_PORT),
	apiKey: `${process.env.VITE_API_KEY}`,
	logLevel: (`${process.env.BACKEND_LOG_LEVEL}` || LOGGER_LEVELS.DEBUG) as LoggerLevel,
};

const mode: string = process.env.NODE_ENV || process.env.MODE || '';
if (/^dev/gi.test(mode)) {
	console.log(`[@swdbapp/backend] Configuration: ${JSON.stringify(configuration)}`);
}

export default configuration;
