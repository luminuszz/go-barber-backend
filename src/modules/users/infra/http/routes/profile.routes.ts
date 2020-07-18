import { Router } from 'express';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAth';

import ProfileController from '../controllers/ProfileController';
import profileValidateUpdate from '../validators/profileValidate';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuth);
profileRouter.put('/', profileValidateUpdate, profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
