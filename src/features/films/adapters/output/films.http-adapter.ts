import type { FilmsHttpClient, FilmModel, FilmsListOutput } from '@swdbapp/infra-http-swapi';
import type {FilmsListDetailInput, FilmsListPortInput, FilmsListPortOutput, FilmsPorts} from '../../application';
import type {Film} from "../../types";
import { strToURL } from '@swdbapp/utils';

export class FilmsHttpAdapter
    implements FilmsPorts {

    constructor(private readonly httpClient: FilmsHttpClient) {}

    private _mapFilmInfraToApplication(item: FilmModel | Error, index?: number | string): Film {
        if (item instanceof Error) {
            throw item;
        }

        return {
            $id: `${index}`,
            title: item.title,
            image: `episode-${item.episode_id}`,
            episodeId: Number(item.episode_id),
            releaseDate: new Date(Date.parse(item.release_date)),
            created: new Date(Date.parse(item.created)),
            edited: new Date(Date.parse(item.edited)),
            url: strToURL(item.url),
            openingCrawl: item.opening_crawl,
            director: item.director,
            producer: item.producer,
            species: item.species.map(str => (strToURL(str) || str)),
            characters: item.species.map(str => (strToURL(str) || str)),
            vehicles: item.species.map(str => (strToURL(str) || str)),
            starships: item.species.map(str => (strToURL(str) || str)),
            planets: item.species.map(str => (strToURL(str) || str)),
        }
    }

    async detail(input: FilmsListDetailInput): Promise<Film> {
        return this._mapFilmInfraToApplication(await this.httpClient.describe(input));
    }

    async list(input: FilmsListPortInput): Promise<FilmsListPortOutput<Film>> {
        const response : FilmsListOutput | Error = await this.httpClient.list(input);
        if (response instanceof Error) {
            throw response;
        }

        return {
            count: response.count,
            next: response.next ? new URL(response.next) : null,
            previous: response.previous ? new URL(response.previous) : null,
            results: response.results.map(this._mapFilmInfraToApplication.bind(this)),
        };
    }
}
