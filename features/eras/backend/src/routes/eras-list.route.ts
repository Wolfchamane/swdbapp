import type { Router } from 'express';
import { erasListController } from '../controllers';
import type { Logger } from '@swdbapp/utils-backend';

export default (router: Router, logger: Logger) => {
	router.get('/api/eras', erasListController({ logger }));
};
