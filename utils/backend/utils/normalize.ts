const camelize = (text: string): string =>
	text
		.split(/_/g)
		.map((part: string, index: number) =>
			index ? `${part.charAt(0).toUpperCase()}${part.substring(1, part.length)}` : part
		)
		.join('');

export const normalizeObjectKeys = (ref: object): object => {
	const normalized = Object.assign({}, ref);
	Object.keys(normalized).forEach((key: string) => {
		const mustBeNormalized: boolean = /_/g.test(key);
		const newKey: string = mustBeNormalized ? camelize(key) : key;
		if (mustBeNormalized) {
			// @ts-expect-error any
			normalized[newKey] = JSON.parse(JSON.stringify(normalized[key]));
			// @ts-expect-error any
			delete normalized[key];
		}

		// @ts-expect-error any
		const newRef = normalized[newKey];
		if (newRef && typeof newRef === 'object') {
			// @ts-expect-error any
			normalized[newKey] = Array.isArray(newRef) ? newRef.map(normalizeObjectKeys) : normalizeObjectKeys(newRef);
		}
	});

	return normalized;
};
