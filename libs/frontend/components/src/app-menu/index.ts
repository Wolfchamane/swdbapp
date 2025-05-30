import styles from './styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { MenuItem } from '../app-menu-item';

@customElement('app-menu')
export class AppMenu extends LitElement {
	static styles = styles;

	@property({}) items?: MenuItem[] = [];

	private _mapItemToAppMenuItem(item: MenuItem) {
		return html`<app-menu-item label="${item.label}" />`;
	}

	render() {
		const appMenuItems = this.items.map(this._mapItemToAppMenuItem.bind(this));

		return html`<aside class="app-menu">
			<ul>
				${appMenuItems}
			</ul>
		</aside>`;
	}
}
