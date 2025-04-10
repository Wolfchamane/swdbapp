import { getCurrentLocale } from './locale';

export const strToDate = (value: string): Date => {
	return new Date(Date.parse(value));
};

export const dateToStr = (value?: Date, locale?: string, format?: string): string => {
	if (value) {
		if (locale) {
			return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(value);
		} else if (format) {
			return format.replace(/(\w+)/g, (match: string) => {
				let formatted: string = '';
				switch (match) {
					case 'YYYY':
						formatted = `${value.getFullYear()}`;
						break;
					case 'YY':
						formatted = `${value.getFullYear()}`.substring(-2);
						break;
					case 'MM':
						formatted = `${Number(value.getMonth() + 1)}`.padStart(2, '0');
						break;
					case 'MMM':
						formatted = new Intl.DateTimeFormat(locale || getCurrentLocale(), { month: 'short' }).format(
							value
						);
						break;
					case 'DD':
						formatted = `${value.getDate()}`.padStart(2, '0');
						break;
					case 'HH':
						formatted = `${value.getHours()}`.padStart(2, '0');
						break;
					case 'mm':
						formatted = `${value.getMinutes()}`.padStart(2, '0');
						break;
					case 'ss':
						formatted = `${value.getSeconds()}`.padStart(2, '0');
						break;
					case 'sss':
						formatted = `${value.getMilliseconds()}`.padStart(3, '0');
						break;
				}
				return formatted;
			});
		} else {
			return value.toUTCString();
		}
	}

	return '';
};
