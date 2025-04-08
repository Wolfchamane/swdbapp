import { titlesDetailController } from '../controllers/titles';
import type { Router } from 'express';

export default (router: Router) => {
	router.get('/api/titles/:id', titlesDetailController);
};
