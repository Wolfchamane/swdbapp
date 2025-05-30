export interface IconProperty {
	icon: (number | string)[];
	iconName: string;
	prefix: string;
}

export interface ParseIconOutput {
	width: number;
	height: number;
	path: string;
	className: string;
	dataPrefix: string;
}
