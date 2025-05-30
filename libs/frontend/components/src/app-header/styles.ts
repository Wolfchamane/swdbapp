import { css } from 'lit';

export default css`
	:host {
		display: block;
		width: 100%;
		height: auto;
	}

	.app-header {
		display: flex;
		align-items: center;
		width: 100%;
		max-height: 75px;
		padding: 0.5em 1em;
		color: var(--color-primary);
		border-bottom: 1px solid var(--color-grey-300);
		text-align: center;
	}

	.app-header__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
	}

	.app-header__title,
	.app-header__location {
		margin: 0;
	}

	.app-header__title {
		margin-bottom: 0.25em;
		font-family: var(--font-jedi);
		font-size: var(--font-size-m);
	}

	@media screen and (max-width: 375px) {
		.app-header__title {
			font-size: var(--font-size-m);
		}
	}

	@media screen and (min-width: 376px) {
		.app-header__title {
			font-size: var(--font-size-l);
		}
	}

	@media screen and (min-width: 1024px) {
		.app-header__title {
			font-size: var(--font-size-xl);
		}
	}

	@media screen and (min-width: 1600px) {
		.app-header__title {
			font-size: var(--font-size-xxl);
		}
	}
`;
