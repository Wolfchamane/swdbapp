import type { ErasHttpClient, EraModel, ListOutput, ListInput } from '@swdbapp/infra-http';
import type {
    ErasDescribePortInput,
    ErasDescribePortOutput,
    ErasListPortInput,
    ErasListPortOutput,
    ErasPorts
} from '../../application';
import type { Era } from '../../types';

export class ErasHttpAdapter
    implements ErasPorts {

    constructor(private readonly httpClient: ErasHttpClient) {}

    private _mapEraModelFromInfraToApplication(era: EraModel): Era {
        return {
            $id: era.id,
            name: era.name,
            description: era.description,
            logo: new URL(era.image),
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
