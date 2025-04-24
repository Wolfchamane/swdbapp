/* eslint-disable @typescript-eslint/no-explicit-any */
import { name, version } from '../package.json';
import chalk from 'chalk';

const errorMessage = chalk.bold.red;
const warnMessage = chalk.hex('#FFA500');
const debugMessage = chalk.blue;

type MessageType = 'DEB' | 'INF' | 'LOG' | 'WAR' | 'ERR';

const _traceMessage = (type: MessageType, message: string, ...args: any[]): void => {
	const level =
		type === 'ERR'
			? errorMessage(type)
			: type === 'WAR'
				? warnMessage(type)
				: type === 'DEB'
					? debugMessage(type)
					: type;

	console.log(`[${new Date().toISOString()}] [${name}:${version}] [${level}] ${message}`, ...args);
};

export const log = (message: string, ...args: any[]): void => _traceMessage('LOG', message, ...args);

export const error = (message: string, ...args: any[]): void => _traceMessage('ERR', message, ...args);

export const warning = (message: string, ...args: any[]): void => _traceMessage('WAR', message, ...args);

export const debug = (message: string, ...args: any[]): void => _traceMessage('DEB', message, ...args);

export const info = (message: string, ...args: any[]): void => _traceMessage('INF', message, ...args);
/* eslint-enable @typescript-eslint/no-explicit-any */
