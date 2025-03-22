export interface HomeViewCardProperties {
	title: string;
	image: string;
	assetsDir: string;
	query?: Record<string, string | number>;
	disabled?: boolean;
}
