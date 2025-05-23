import { Pool, type PoolConfig, type QueryConfig, type QueryResult } from 'pg';

const user: string = `${process.env.PGUSER}`;
const host: string = `${process.env.PGHOST}`;
const database: string = `${process.env.PGDATABASE}`;
const password: string = `${process.env.PGPASSWORD}`;
const port: number = Number(process.env.PGPORT);
const connectionString: string = `postgres://${user}:${password}@${host}:${port}/${database}`;

const config: PoolConfig = {
	user,
	host,
	database,
	password,
	port,
	connectionString,
};

const mode: string = process.env.NODE_ENV || process.env.MODE || '';
if (/^dev/gi.test(mode)) {
	console.log('[@swdbapp/backend] DB pool configuration: %s', JSON.stringify(config));
}

const pool: Pool = new Pool(config);

export const query = async (config: QueryConfig): Promise<QueryResult> => await pool.query(config);
