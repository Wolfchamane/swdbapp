import '@dotenvx/dotenvx/config';
import { Pool, type PoolClient } from 'pg';

let poolSingleton: PoolClient | Pool;

export const provideDBPool = (): PoolClient | Pool => {
	poolSingleton =
		poolSingleton ||
		new Pool({
			user: process.env.DATABASE_USER,
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_ORIG,
			password: process.env.DATABASE_PASS,
			port: Number(process.env.DATABASE_PORT),
		});

	return poolSingleton;
};
