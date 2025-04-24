import { Router } from 'express';
import { provideErasBackendRoutes } from '@swdbapp/feature-eras-backend';
import { provideTitlesBackendRoutes } from '@swdbapp/feature-titles-backend';
import type { Logger } from '@swdbapp/utils-backend';

export default (logger: Logger): Router => {
	const router = Router();
	provideErasBackendRoutes(router, logger);
	provideTitlesBackendRoutes(router, logger);
	return router;
};
