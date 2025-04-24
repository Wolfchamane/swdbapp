import { titleDetailsController } from '../controllers';
import type { Router } from 'express';
import type { Logger } from '@swdbapp/utils-backend';

export default (router: Router, logger: Logger): void => {
	router.get('/api/titles/:id', titleDetailsController(logger));
};
