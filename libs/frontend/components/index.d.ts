import { AppHeader, AppIcon, AppMenu, AppMenuItem } from './src';

declare global {
	interface HTMLElementTagNameMap {
		'app-header': AppHeader;
		'app-icon': AppIcon;
		'app-menu': AppMenu;
		'app-menu-item': AppMenuItem;
	}
}
