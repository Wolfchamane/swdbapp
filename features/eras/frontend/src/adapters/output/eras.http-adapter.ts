import { provideAssetURL } from '@swdbapp/core-feature';
import type { EraModel, EraModelTitle, ErasHttpClient, ListOutput } from '@swdbapp/infra-http';
import type { Nullable } from '@swdbapp/types';
import type {
	ErasDescribePortInput,
	ErasDescribePortOutput,
	ErasListPortInput,
	ErasListPortOutput,
	ErasPorts,
} from '../../application';
import type { EraDetails, EraTitle } from '../../types';

export class ErasHttpAdapter implements ErasPorts {
	constructor(private readonly httpClient: ErasHttpClient) {}

	private _mapEraTitleModelFromInfraToApplication(titles: Nullable<EraModelTitle[]>): Nullable<EraTitle[]> {
		return Array.isArray(titles)
			? titles.map((title: EraModelTitle) => ({
					$id: title.id,
					title: title.title,
					logo: provideAssetURL(title.logo),
				}))
			: null;
	}

	private _mapEraModelFromInfraToApplication(era: EraModel): EraDetails {
		return {
			$id: era.id,
			name: era.name,
			description: era.description,
			logo: new URL(era.image),
			titles: this._mapEraTitleModelFromInfraToApplication(era.titles),
		};
	}

	async list(input?: ErasListPortInput): Promise<ErasListPortOutput> {
		const response: ListOutput<EraModel> | Error = await this.httpClient.list(input);

		if (response instanceof Error) {
			throw response;
		}

		return {
			...response,
			items: response.items.map(this._mapEraModelFromInfraToApplication.bind(this)),
		};
	}

	async describe(input: ErasDescribePortInput): Promise<ErasDescribePortOutput> {
		const response: EraModel | Error = await this.httpClient.describe(input);
		if (response instanceof Error) {
			throw response;
		}

		return this._mapEraModelFromInfraToApplication(response);
	}
}
