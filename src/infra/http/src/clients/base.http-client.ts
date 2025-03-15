import { JSONAdapter, type XHRConfiguration, XHRFetchOptions, XHR_DEBUG_LEVELS } from '@amjs/js-utils';

export class BaseHttpClient extends JSONAdapter {
	private cacheExpiration: number | undefined;
	private cache: Record<string, string> | undefined;

	constructor(config?: XHRConfiguration) {
		super({
			...(config || {}),
			hostname: 'swapi.dev/api',
		});

		this._setCacheExpiration();
		this.cache = {};
	}

	private _cacheHasExpired(): boolean {
		return Date.now() > this.cacheExpiration;
	}

	private _isCached(url: URL): boolean {
		return Object.keys(this.cache).includes(url.href);
	}

	private _fromCache<T>(url: URL): T | undefined {
		let value: T | undefined;
		try {
			value = JSON.parse(this.cache[url.href]) as T;
		} catch (e: unknown) {
			this._log(XHR_DEBUG_LEVELS.ERROR, false, 'Cannot parse undefined cached value: %o', e);
		}

		return value;
	}

	private _toCache<T>(url: URL, response: T | Error): void {
		if (this.cache !== undefined) {
			this.cache[url.href] = JSON.stringify(response);
		}
	}

	private _setCacheExpiration(): void {
		const A_DAY: number = Number(1000 * 60 * 60 * 24);
		this.cacheExpiration = new Date(Number(Date.now() + A_DAY)).getTime();
	}

	/**
	 * @override
	 */
	protected async _unSerialize<T>(): Promise<T | Error> {
		const response: T | Error = await super._unSerialize<T>();
		if (this._cacheHasExpired()) {
			this._setCacheExpiration();
		}

		if (!this._isCached(this.url)) {
			this._toCache<T>(this.url, response);
		}

		return response;
	}

	/**
	 * @override
	 */
	async fetch<T>(path: string, options?: XHRFetchOptions): Promise<T | Error> {
		super.reset();
		super.buildRequest(path, options);
		const response: T | Error | undefined = this._fromCache<T>(this.url);

		return response || (await super.fetch<T>(path, options));
	}
}
