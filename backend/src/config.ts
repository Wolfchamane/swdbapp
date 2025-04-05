export interface AppConfiguration {
	allowOrigin: string;
	port: number;
}

const configuration: AppConfiguration = {
	allowOrigin: `${process.env.BACKEND_ACCEPT_ORIGIN}`,
	port: Number(process.env.BACKEND_PORT),
};

export default configuration;
