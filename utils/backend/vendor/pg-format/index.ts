/* eslint-disable @typescript-eslint/no-explicit-any */
import reservedMap, { type ReservedMap } from './reserved';

const fmtPattern = {
	ident: 'I',
	literal: 'L',
	string: 's',
};

// convert to Postgres default ISO 8601 format
function formatDate(date: string): string {
	date = date.replace('T', ' ');
	date = date.replace('Z', '+00');
	return date;
}

function isReserved(value: string): boolean {
	return !!reservedMap[value.toUpperCase() as keyof ReservedMap];
}

function arrayToList(useSpace: boolean, array: any[], formatter: (value: string) => string) {
	let sql = '';

	sql += useSpace ? ' (' : '(';
	for (let i = 0; i < array.length; i++) {
		sql += (i === 0 ? '' : ', ') + formatter(array[i]);
	}
	sql += ')';

	return sql;
}

// Ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
function quoteIdent(value?: any): string {
	if (value === undefined || value === null) {
		throw new Error('SQL identifier cannot be null or undefined');
	} else if (value === false) {
		return '"f"';
	} else if (value === true) {
		return '"t"';
	} else if (value instanceof Date) {
		return '"' + formatDate(value.toISOString()) + '"';
	} else if (value instanceof Buffer) {
		throw new Error('SQL identifier cannot be a buffer');
	} else if (Array.isArray(value) === true) {
		const temp = [];
		for (let i = 0; i < value.length; i++) {
			if (Array.isArray(value[i]) === true) {
				throw new Error('Nested array to grouped list conversion is not supported for SQL identifier');
			} else {
				temp.push(quoteIdent(value[i]));
			}
		}
		return temp.toString();
	} else if (value === Object(value)) {
		throw new Error('SQL identifier cannot be an object');
	}

	const ident = value.toString().slice(0); // create copy

	// do not quote a valid, unquoted identifier
	if (/^[a-z_][a-z0-9_$]*$/.test(ident) === true && isReserved(ident) === false) {
		return ident;
	}

	let quoted = '"';

	for (let i = 0; i < ident.length; i++) {
		const c = ident[i];
		if (c === '"') {
			quoted += c + c;
		} else {
			quoted += c;
		}
	}

	quoted += '"';

	return quoted;
}

// Ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
function quoteLiteral(value: any): string {
	let literal = null;
	let explicitCast = null;

	if (value === undefined || value === null) {
		return 'NULL';
	} else if (value === false) {
		return "'f'";
	} else if (value === true) {
		return "'t'";
	} else if (value instanceof Date) {
		return "'" + formatDate(value.toISOString()) + "'";
	} else if (value instanceof Buffer) {
		return "E'\\\\x" + value.toString('hex') + "'";
	} else if (Array.isArray(value) === true) {
		const temp = [];
		for (let i = 0; i < value.length; i++) {
			if (Array.isArray(value[i]) === true) {
				temp.push(arrayToList(i !== 0, value[i], quoteLiteral));
			} else {
				temp.push(quoteLiteral(value[i]));
			}
		}
		return temp.toString();
	} else if (value === Object(value)) {
		explicitCast = 'jsonb';
		literal = JSON.stringify(value);
	} else {
		literal = value.toString().slice(0); // create copy
	}

	let hasBackslash = false;
	let quoted = "'";

	for (let i = 0; i < literal.length; i++) {
		const c = literal[i];
		if (c === "'") {
			quoted += c + c;
		} else if (c === '\\') {
			quoted += c + c;
			hasBackslash = true;
		} else {
			quoted += c;
		}
	}

	quoted += "'";

	if (hasBackslash === true) {
		quoted = 'E' + quoted;
	}

	if (explicitCast) {
		quoted += '::' + explicitCast;
	}

	return quoted;
}

function quoteString(value: any): string {
	if (value === undefined || value === null) {
		return '';
	} else if (value === false) {
		return 'f';
	} else if (value === true) {
		return 't';
	} else if (value instanceof Date) {
		return formatDate(value.toISOString());
	} else if (value instanceof Buffer) {
		return '\\x' + value.toString('hex');
	} else if (Array.isArray(value) === true) {
		const temp = [];
		for (let i = 0; i < value.length; i++) {
			if (value[i] !== null && value[i] !== undefined) {
				if (Array.isArray(value[i]) === true) {
					temp.push(arrayToList(i !== 0, value[i], quoteString));
				} else {
					temp.push(quoteString(value[i]));
				}
			}
		}
		return temp.toString();
	} else if (value === Object(value)) {
		return JSON.stringify(value);
	}

	return value.toString().slice(0); // return copy
}

export interface PgFormatConfiguration {
	pattern: {
		ident?: string;
		literal?: string;
		string?: string;
	};
}

export function config(cfg: PgFormatConfiguration) {
	// default
	fmtPattern.ident = 'I';
	fmtPattern.literal = 'L';
	fmtPattern.string = 's';

	if (cfg && cfg.pattern) {
		if (cfg.pattern.ident) {
			fmtPattern.ident = cfg.pattern.ident;
		}
		if (cfg.pattern.literal) {
			fmtPattern.literal = cfg.pattern.literal;
		}
		if (cfg.pattern.string) {
			fmtPattern.string = cfg.pattern.string;
		}
	}
}

function formatWithArray(fmt: string, parameters: any[]): string {
	let index: number = 0;
	const params: any[] = parameters;

	let re: string | RegExp = '%(%|(\\d+\\$)?[';
	re += fmtPattern.ident;
	re += fmtPattern.literal;
	re += fmtPattern.string;
	re += '])';
	re = new RegExp(re, 'g');

	return fmt.replace(re, function (match: string): string {
		if (match === '%') {
			return '%';
		}

		const position = index;
		const tokens: string[] = match.split('%');

		if (position > params.length - 1) {
			throw new Error('too few arguments');
		}

		index = position + 1;

		if (tokens[1] === fmtPattern.ident) {
			return quoteIdent(params[position]);
		} else if (tokens[1] === fmtPattern.literal) {
			return quoteLiteral(params[position]);
		} else if (tokens[1] === fmtPattern.string) {
			return quoteString(params[position]);
		}

		return match;
	});
}

export function format(fmt: string, ...rest: any): string {
	const args = Array.prototype.slice.call(rest);
	return formatWithArray(fmt, args);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
