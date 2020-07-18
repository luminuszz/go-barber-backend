import { Router } from 'express';
import SessionController from '../controllers/SessionsController';
import sessionValidateCreate from '../validators/sessionValidate';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/', sessionValidateCreate, sessionController.create);

export default sessionsRouter;
