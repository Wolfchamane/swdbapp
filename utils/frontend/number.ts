export const numberToRoman = (num: number): string => {
	const map: [number, string][] = [
		[1000, 'M'],
		[900, 'CM'],
		[500, 'D'],
		[400, 'CD'],
		[100, 'C'],
		[90, 'XC'],
		[50, 'L'],
		[40, 'XL'],
		[10, 'X'],
		[9, 'IX'],
		[5, 'V'],
		[4, 'IV'],
		[1, 'I'],
	];
	let result = '';
	for (const [value, roman] of map) {
		while (num >= value) {
			result += roman;
			num -= value;
		}
	}

	return result;
};

export const numberToReadableTime = (value: number): string => {
	if (value) {
		const HOUR: number = Number(60 * 60 * 1000);
		const MIN: number = Number(60 * 1000);

		const durationHours: number = Number(value / HOUR);
		const hours: number = Math.trunc(durationHours);
		const durationMinutes: number = value - Number(hours * HOUR);
		const minutes: number = Number(durationMinutes / MIN);

		return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}min`;
	}

	return '';
};
