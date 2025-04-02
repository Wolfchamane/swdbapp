import { Router } from 'express';
import provideErasRoutes from './eras';

export default (): Router => {
	const router = Router();
	provideErasRoutes(router);

	return router;
};
