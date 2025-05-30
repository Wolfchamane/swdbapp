import styles from './styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../app-icon';

@customElement('app-header')
export class AppHeader extends LitElement {
	// Define scoped styles right with your component, in plain CSS
	static styles = styles;

	@property({})
	location?: string = 'DB Explorer';

	// Render the UI as a function of component state
	render() {
		return html`<header class="app-header">
			<div class="app-header__icon-wrapper">
				<app-icon .icon="${faBars}"></app-icon>
			</div>
			<div class="app-header__content">
				<h1 class="app-header__title">Star Wars</h1>
				<p class="app-header__location">${this.location}</p>
			</div>
		</header>`;
	}
}
