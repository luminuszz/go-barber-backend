import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const sessionsService = new CreateSessionService();
  try {
    const { email, password } = req.body;

    const { user, token } = await sessionsService.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

export default sessionsRouter;
