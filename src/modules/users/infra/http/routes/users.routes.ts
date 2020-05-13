import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAth';

import uploadConfig from '@Config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const usersRepository = new UsersRepository();
  const userService = new CreateUserService(usersRepository);
  const { name, email, password } = req.body;

  const newUser = await userService.execute({ email, name, password });
  delete newUser.password;

  return res.json(newUser);
});

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = new UsersRepository();
    const updateAvatarService = new UpdateUserAvatarService(usersRepository);
    const user = await updateAvatarService.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  },
);

export default usersRouter;
