import { Pool, type PoolConfig, type QueryConfig, type QueryResult } from 'pg';

const config: PoolConfig = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: Number(process.env.PGPORT),
	connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
};

const mode: string = process.env.NODE_ENV || process.env.MODE || '';
if (/^dev/gi.test(mode)) {
	console.log('[@swdbapp/backend] DB pool configuration: %s', JSON.stringify(config));
}

const pool: Pool = new Pool(config);

export const query = async (config: QueryConfig): Promise<QueryResult> => await pool.query(config);
