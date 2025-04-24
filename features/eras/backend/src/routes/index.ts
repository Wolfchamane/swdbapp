import eraDetailsRoute from './era-details.route';
import erasListRoute from './eras-list.route';
import type { Router } from 'express';
import type { Logger } from '@swdbapp/utils-backend';
import { selectOneTitleByTitle } from '@swdbapp/feature-titles-backend';

export const provideErasBackendRoutes = (router: Router, logger: Logger): void => {
	erasListRoute(router, logger);
	eraDetailsRoute(router, { logger, selectOneTitleByTitle });
};
