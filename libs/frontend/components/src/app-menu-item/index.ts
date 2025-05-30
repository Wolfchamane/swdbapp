import styles from './styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { MenuItem } from './types';

export { type MenuItem };

@customElement('app-menu-item')
export class AppMenuItem extends LitElement {
	static styles = styles;

	@property({}) label?: string;

	render() {
		return html`<li>${this.label}</li>`;
	}
}
