import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAth';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMouthAvaillabilityController from '../controllers/ProviderMouthAvaillabilityController';
import ProviderDayAvaillabilityController from '../controllers/ProviderDayAvaillabilityController';

import {
  appointmentValidateDayAvailabilility,
  appointmentValidateMonthAvailabilility,
} from '../validators/providerValidate';

const ProvidersRouter = Router();
const providersController = new ProvidersController();
const providerMouthAvaillabilityController = new ProviderMouthAvaillabilityController();
const PproviderDayAvaillabilityController = new ProviderDayAvaillabilityController();

ProvidersRouter.use(ensureAuth);

ProvidersRouter.get('/', providersController.index);

ProvidersRouter.get(
  '/:provider_id/month-availabilility',
  appointmentValidateMonthAvailabilility,
  providerMouthAvaillabilityController.index,
);

ProvidersRouter.get(
  '/:provider_id/day-availabilility',
  appointmentValidateDayAvailabilility,
  PproviderDayAvaillabilityController.index,
);

export default ProvidersRouter;
