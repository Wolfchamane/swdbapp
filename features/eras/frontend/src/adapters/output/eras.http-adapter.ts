import { provideAssetURL } from '@swdbapp/core-feature';
import type {
	EraDetailResponse,
	EraItem,
	EraTitle,
	ErasErasListInput,
	ErasHttpClient,
} from '@swdbapp/feature-eras-infra-http';
import type { ListOutput } from '@swdbapp/types';
import type {
	ErasDescribePortInput,
	ErasDescribePortOutput,
	ErasListPortInput,
	ErasListPortOutput,
	ErasPorts,
} from '../../application';
import type { Era, EraDetails, EraDetailsTitle } from '../../types';

export class ErasHttpAdapter implements ErasPorts {
	constructor(private readonly httpClient: ErasHttpClient) {}

	private _mapEraDetailsTitlesFromInfraToApplication(title: EraTitle): EraDetailsTitle {
		return {
			$id: title.id,
			title: title.title,
			logo: provideAssetURL(title.logo),
			order: title.order,
		};
	}

	private _mapEraDetailsFromInfraToApplication(era: EraDetailResponse): EraDetails {
		return {
			$id: era.id,
			name: era.name,
			logo: provideAssetURL(era.image),
			description: era.description,
			titles: (era.titles || [])
				.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0))
				.map(this._mapEraDetailsTitlesFromInfraToApplication.bind(this)),
		};
	}

	private _mapEraItemFromInfraToApplication(era: EraItem): Era {
		return {
			$id: era.id,
			name: era.name,
			logo: provideAssetURL(era.image),
		};
	}

	async list(input?: ErasListPortInput): Promise<ErasListPortOutput> {
		const httpClientListInput: ErasErasListInput = {};
		if (input) {
			httpClientListInput.limit = input.limit;
			httpClientListInput.offset = input.offset;
			httpClientListInput.orderBy = String(input.orderBy);
			httpClientListInput.orderDir = input.orderDir;
			httpClientListInput.search = input.search;
			httpClientListInput.searchBy = String(input.orderBy);
		}

		const response: ListOutput<EraItem> | Error = await this.httpClient.list(httpClientListInput);

		if (response instanceof Error) {
			throw response;
		}

		return {
			...response,
			items: response.items.map(this._mapEraItemFromInfraToApplication.bind(this)),
		};
	}

	async describe(input: ErasDescribePortInput): Promise<ErasDescribePortOutput> {
		const response: EraDetailResponse | Error = await this.httpClient.details(input);
		if (response instanceof Error) {
			throw response;
		}

		return this._mapEraDetailsFromInfraToApplication(response);
	}
}
