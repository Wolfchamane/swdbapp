import type { Router } from 'express';
import { eraDetailsController } from '../controllers';
import type { Logger } from '@swdbapp/utils-backend';
import { QueryConfig } from 'pg';

export interface EraDetailsRouterOptions {
	logger: Logger;
	selectOneTitleByTitle(title: string): Promise<QueryConfig>;
}

export default (router: Router, { logger, selectOneTitleByTitle }: EraDetailsRouterOptions) => {
	router.get('/api/eras/:id', eraDetailsController({ logger, selectOneTitleByTitle }));
};
