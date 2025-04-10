import type {
	TitleDetailPortInput,
	TitleDetailPortOutput,
	TitlesListPortInput,
	TitlesListPortOutput,
	TitlesPorts,
} from '../../application';
import type { TitlesHttpClient, TitleModel, ListOutput, ListInput } from '@swdbapp/infra-http';
import type { Title, TitleDetails } from '../../types';
import { provideAssetURL } from '@swdbapp/core-feature';
import { strToDate } from '@swdbapp/utils';

export class TitlesHttpAdapter implements TitlesPorts {
	constructor(private readonly httpClient: TitlesHttpClient) {}

	private _mapTitleInfraToApplication<T>(title: TitleModel | Error, addDetails?: boolean): T {
		if (title instanceof Error) {
			throw title;
		}

		let mapItem = {
			$id: title.id,
			title: title.title,
			logo: provideAssetURL(title.logo),
		};

		if (addDetails) {
			mapItem = Object.assign(mapItem, {
				actors: title.actors ? title.actors.split(/,/g) : null,
				director: title.director ? title.director : null,
				duration: Number(title.duration),
				genre: title.genre ? title.genre.split(/,/g) : null,
				musicDirector: title.music_director || null,
				openingCrawl: title.opening_crawl || null,
				plot: title.plot || null,
				poster: title.poster ? provideAssetURL(title.poster) : null,
				producers: title.producers ? title.producers.split(/,/g) : null,
				rating: title.rating || null,
				releaseDate: title.release_date ? strToDate(title.release_date) : null,
				resume: title.resume || null,
				type: title.type || null,
			});
		}

		return mapItem as T;
	}

	async detail(input: TitleDetailPortInput): Promise<TitleDetailPortOutput> {
		return this._mapTitleInfraToApplication<TitleDetails>(await this.httpClient.describe(input), true);
	}

	private _mapPortToHttpClientInput(input?: TitlesListPortInput): ListInput<TitleModel> | undefined {
		let httpClientListInput: ListInput<TitleModel> | undefined = undefined;

		if (input && Object.values(input).some(value => value !== undefined)) {
			httpClientListInput = {};
			if (input.offset !== undefined) {
				httpClientListInput.offset = input.offset;
			}
			if (input.limit !== undefined) {
				httpClientListInput.limit = input.limit;
			}
			if (input.orderBy !== undefined) {
				httpClientListInput.orderBy = input.orderBy as keyof TitleModel;
			}
			if (input.orderDir !== undefined) {
				httpClientListInput.orderDir = input.orderDir;
			}
			if (input.searchBy !== undefined) {
				httpClientListInput.searchBy = input.searchBy as keyof TitleModel;
			}
			if (input.search !== undefined) {
				httpClientListInput.search = input.search;
			}
		}

		return httpClientListInput;
	}

	async list(input?: TitlesListPortInput): Promise<TitlesListPortOutput> {
		const response: ListOutput<TitleModel> | Error = await this.httpClient.list(
			this._mapPortToHttpClientInput(input)
		);

		if (response instanceof Error) {
			throw response;
		}

		return {
			offset: response.offset,
			limit: response.limit,
			total: response.total,
			items: response.items.map((item: TitleModel) => this._mapTitleInfraToApplication<Title>(item)),
		};
	}
}
