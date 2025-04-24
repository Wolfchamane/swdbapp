import titleDetailsRoute from './title-details.route';
import titlesListRoute from './titles-list.route';
import type { Router } from 'express';
import type { Logger } from '@swdbapp/utils-backend';

export const provideTitlesBackendRoutes = (router: Router, logger: Logger): void => {
	titlesListRoute(router, logger);
	titleDetailsRoute(router, logger);
};
