import styles from './styles';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { IconProperty, ParseIconOutput } from './types';

@customElement('app-icon')
export class AppIcon extends LitElement {
	static styles = styles;

	@property({ type: Object, attribute: false })
	icon?: IconProperty;

	private _parseIcon(): ParseIconOutput {
		const source: (number | string)[] = this.icon?.icon;
		const width: number = Number(source[0]);
		const height: number = Number(source[1]);
		const path: string = `${source[4]}`;
		const className: string = `svg-inline--fa fa-${this.icon?.iconName}`;
		const dataPrefix: string = `${this.icon?.prefix}`;

		return { width, height, path, className, dataPrefix };
	}

	render() {
		if (!this.icon) {
			throw new Error(
				`[app-icon] Could not parse icon property.\nValue: "${this.icon}"\nExpected: {AppIconProperty}`
			);
		}

		const { width, height, path, dataPrefix, className } = this._parseIcon();

		return html`<svg
			viewBox="0 0 ${width} ${height}"
			aria-hidden="true"
			focusable="true"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			data-icon="${this.icon?.iconName}"
			data-prefix="${dataPrefix}"
			class="${className}">
			<path fill="currentcolor" d="${path}"></path>
		</svg>`;
	}
}
