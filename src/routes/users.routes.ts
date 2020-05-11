import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuth from '../middlewares/ensureAth';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  const userService = new CreateUserService();
  const { name, email, password } = req.body;

  try {
    const newUser = await userService.execute({ email, name, password });
    delete newUser.password;

    return res.json(newUser);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuth, (req, res) => {
  return res.json({ ok: true });
});

export default usersRouter;
