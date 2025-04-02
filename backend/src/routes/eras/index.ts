import type { Router } from 'express';
import { erasListController, erasDetailController } from '../../controllers';

export default (router: Router) => {
	router.get('/api/eras', erasListController);
	router.get('/api/eras/:id', erasDetailController);
};
