import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import {
  passwordValidateForgot,
  passwordValidateReset,
} from '../validators/passwordValidate';

const passwordRouter = Router();
const pawsswordController = new ForgotPasswordController();
const resetePasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  passwordValidateForgot,
  pawsswordController.create,
);
passwordRouter.post(
  '/reset',
  passwordValidateReset,
  resetePasswordController.create,
);

export default passwordRouter;
