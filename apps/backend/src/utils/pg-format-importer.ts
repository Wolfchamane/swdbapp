/* eslint-disable @typescript-eslint/no-explicit-any */
export default async (): Promise<(_: any, ...args: any) => string> => {
	// @ts-expect-error undefined import
	const module = await import('pg-format/lib/index.js');

	return module.default;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
