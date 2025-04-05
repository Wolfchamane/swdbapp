import { Pool, type PoolConfig, type QueryConfig, type QueryResult } from 'pg';

const config: PoolConfig = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.DATABASE_ORIG,
	password: process.env.PGPASSWORD,
	port: Number(process.env.PGPORT),
	connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
};

// console.log('[DEBUG] DB pool configuration: %s', JSON.stringify(config));

const pool: Pool = new Pool(config);

export const query = async (config: QueryConfig): Promise<QueryResult> => await pool.query(config);
