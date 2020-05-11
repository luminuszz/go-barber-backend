import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuth from '../middlewares/ensureAth';

import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateAvatarService = new UpdateUserAvatarService();
      const user = await updateAvatarService.execute({
        userId: req.user.id,
        avatarFilename: req.file.filename,
      });
      delete user.password;
      return res.json(user);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
);

export default usersRouter;
