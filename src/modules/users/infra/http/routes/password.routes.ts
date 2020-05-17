import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const pawsswordController = new ForgotPasswordController();
const resetePasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', pawsswordController.create);
passwordRouter.post('/reset', resetePasswordController.create);

export default passwordRouter;
