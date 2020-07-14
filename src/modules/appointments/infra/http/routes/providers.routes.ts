import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAth';
import ProvidersController from '../controllers/ProvidersController';

const ProvidersRouter = Router();
const providersController = new ProvidersController();
ProvidersRouter.use(ensureAuth);

ProvidersRouter.get('/', providersController.index);

export default ProvidersRouter;
