import { provideAssetURL } from '@swdbapp/core-feature';
import type {
	TitleDetailResponse,
	TitleItem,
	TitlesHttpClient,
	TitlesTitlesListInput,
} from '@swdbapp/feature-titles-infra-http';
import type { ListOutput } from '@swdbapp/types';
import { strToDate } from '@swdbapp/utils-frontend';
import type {
	TitleDetailPortInput,
	TitleDetailPortOutput,
	TitlesListPortInput,
	TitlesListPortOutput,
	TitlesPorts,
} from '../../application';
import type { Title, TitleDetails } from '../../types';

export class TitlesHttpAdapter implements TitlesPorts {
	constructor(private readonly httpClient: TitlesHttpClient) {}

	private _mapTitleInfraToApplication<T>(title: TitleItem | TitleDetailResponse | Error, addDetails?: boolean): T {
		if (title instanceof Error) {
			throw title;
		}

		let mapItem = {
			$id: title.id,
			title: title.name,
			logo: provideAssetURL(title.logo),
		};

		if (addDetails) {
			const {
				actors,
				director,
				duration,
				genre,
				musicDirector,
				openingCrawl,
				plot,
				poster,
				producers,
				rating,
				releaseDate,
				resume,
				type,
			} = title as TitleDetailResponse;
			mapItem = Object.assign(mapItem, {
				actors: actors ? actors.split(/,/g) : null,
				director: director ? director : null,
				duration: Number(duration),
				genre: genre ? genre.split(/,/g) : null,
				musicDirector: musicDirector || null,
				openingCrawl: openingCrawl || null,
				plot: plot || null,
				poster: poster ? provideAssetURL(poster) : null,
				producers: producers ? producers.split(/,/g) : null,
				rating: rating || null,
				releaseDate: releaseDate ? strToDate(releaseDate) : null,
				resume: resume || null,
				type: type || null,
			});
		}

		return mapItem as T;
	}

	async detail(input: TitleDetailPortInput): Promise<TitleDetailPortOutput> {
		return this._mapTitleInfraToApplication<TitleDetails>(await this.httpClient.details(input), true);
	}

	private _mapPortToHttpClientInput(input?: TitlesListPortInput): TitlesTitlesListInput {
		const httpClientListInput: TitlesTitlesListInput = {};

		if (input) {
			httpClientListInput.offset = input.offset;
			httpClientListInput.limit = input.limit;
			httpClientListInput.orderBy = input.orderBy;
			httpClientListInput.orderDir = input.orderDir;
			httpClientListInput.searchBy = input.searchBy;
			httpClientListInput.search = input.search;
		}

		return httpClientListInput;
	}

	async list(input?: TitlesListPortInput): Promise<TitlesListPortOutput> {
		const response: ListOutput<TitleItem> | Error = await this.httpClient.list(
			this._mapPortToHttpClientInput(input)
		);

		if (response instanceof Error) {
			throw response;
		}

		return {
			offset: response.offset,
			limit: response.limit,
			total: response.total,
			items: response.items.map((item: TitleItem) => this._mapTitleInfraToApplication<Title>(item)),
		};
	}
}
