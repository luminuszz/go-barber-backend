import { Router } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();
  const sessionsService = new CreateSessionService(usersRepository);

  const { email, password } = req.body;

  const { user, token } = await sessionsService.execute({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
