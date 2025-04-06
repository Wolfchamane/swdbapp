import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface AppMenuItemProperties {
	title: string;
	icon?: IconDefinition;
	query?: Record<string, string | number>;
	disabled?: boolean;
	expanded: boolean;
	active: boolean;
}
