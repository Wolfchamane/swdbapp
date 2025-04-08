import type {
    TitleDetailPortInput,
    TitleDetailPortOutput,
    TitlesListPortInput,
    TitlesListPortOutput,
    TitlesPorts
} from '../../application';
import type { TitlesHttpClient, ListInput, TitleModel, ListOutput } from '@swdbapp/infra-http';
import type { Title, TitleDetails } from '../../types';
import { provideAssetURL } from '@swdbapp/core-feature';

export class TitlesHttpAdapter
    implements TitlesPorts {

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
            mapItem = Object.assign(
                mapItem,
                {
                    actors: title.actors.split(/,/g),
                    director: title.director,
                    duration: Number(title.duration),
                    genre: title.genre.split(/,/g),
                    musicDirector: title.music_director,
                    openingCrawl: title.opening_crawl,
                    plot: title.plot,
                    poster: provideAssetURL(title.poster),
                    producers: title.producers.split(/,/g),
                    rating: title.rating,
                    releaseDate: new Date(Date.parse(title.release_date)),
                    resume: title.resume,
                    type: title.type,
                }
            )
        }

        return mapItem as T;
    }

    async detail(input: TitleDetailPortInput): Promise<TitleDetailPortOutput> {
        return this._mapTitleInfraToApplication<TitleDetails>(await this.httpClient.describe(input), true);
    }

    async list(input: TitlesListPortInput): Promise<TitlesListPortOutput> {
        const httpClientListInput: ListInput<TitleModel> = {
            offset: input.offset,
            limit: input.limit,
            orderBy: input.orderBy as keyof TitleModel,
            orderDir: input.orderDir,
            searchBy: input.searchBy as keyof TitleModel,
            search: input.search,
        };

        const response: ListOutput<TitleModel> | Error = await this.httpClient.list(httpClientListInput);
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
