import { Router } from 'express';
import provideErasRoutes from './eras';
import provideTitlesRoutes from './titles';

export default (): Router => {
	const router = Router();
	provideErasRoutes(router);
    provideTitlesRoutes(router);
	return router;
};
