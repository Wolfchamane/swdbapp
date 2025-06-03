import chalk from 'chalk';

const errorMessage = chalk.bold.red;
const warnMessage = chalk.hex('#FFA500');
const debugMessage = chalk.blue;

type MessageType = 'DEB' | 'INF' | 'LOG' | 'WAR' | 'ERR';
type MessageArgs = (string | number | boolean | object)[];

export type LoggerLevel = 'DEBUG' | 'INFO' | 'LOG' | 'WARNING' | 'ERROR';
export const LOGGER_LEVELS: Record<string, LoggerLevel> = Object.freeze({
	DEBUG: 'DEBUG' as LoggerLevel,
	INFO: 'INFO' as LoggerLevel,
	LOG: 'LOG' as LoggerLevel,
	WARNING: 'WARNING' as LoggerLevel,
	ERROR: 'ERROR' as LoggerLevel,
});

interface MapLoggerLevelToMessageTypeInput {
	level: LoggerLevel;
	type: MessageType;
}

const isMessageTypeWithinLoggerLevel = ({ level, type }: MapLoggerLevelToMessageTypeInput): boolean => {
	const map: Record<LoggerLevel, MessageType[]> = {
		DEBUG: ['DEB', 'INF', 'LOG', 'WAR', 'ERR'],
		INFO: ['INF', 'LOG', 'WAR', 'ERR'],
		LOG: ['LOG', 'WAR', 'ERR'],
		WARNING: ['WAR', 'ERR'],
		ERROR: ['ERR'],
	};

	return map[level].includes(type);
};

export interface LoggerOptions {
	module: string;
	version: string;
	level?: LoggerLevel;
}

export interface Logger {
	readonly module: string;
	readonly version: string;
	log(message: string, ...args: MessageArgs): void;
	debug(message: string, ...args: MessageArgs): void;
	info(message: string, ...args: MessageArgs): void;
	warning(message: string, ...args: MessageArgs): void;
	error(message: string, ...args: MessageArgs): void;
}

export class DefaultLogger implements Logger {
	readonly module: string = '';
	readonly version: string = '';

	private singleton: Logger | undefined;
	private level: LoggerLevel = 'LOG';

	static $i(options: LoggerOptions): Logger {
		DefaultLogger.prototype.singleton = DefaultLogger.prototype.singleton || new DefaultLogger(options);

		return DefaultLogger.prototype.singleton;
	}

	constructor({ module, version }: LoggerOptions) {
		this.version = version;
		this.module = module;
	}

	private _traceMessage(type: MessageType, message: string, ...args: MessageArgs) {
		const canPrintMessage: boolean = isMessageTypeWithinLoggerLevel({
			level: this.level,
			type,
		});

		if (canPrintMessage) {
			const level =
				type === 'ERR'
					? errorMessage(type)
					: type === 'WAR'
						? warnMessage(type)
						: type === 'DEB'
							? debugMessage(type)
							: type;

			console.log(
				`[${new Date().toISOString()}] [${this.module}:${this.version}] [${level}] ${message}`,
				...args
			);
		}
	}

	log(message: string, ...args: MessageArgs): void {
		this._traceMessage('LOG', message, ...args);
	}

	error(message: string, ...args: MessageArgs): void {
		this._traceMessage('ERR', message, ...args);
	}

	warning(message: string, ...args: MessageArgs): void {
		this._traceMessage('WAR', message, ...args);
	}

	debug(message: string, ...args: MessageArgs): void {
		this._traceMessage('DEB', message, ...args);
	}

	info(message: string, ...args: MessageArgs): void {
		this._traceMessage('INF', message, ...args);
	}
}
