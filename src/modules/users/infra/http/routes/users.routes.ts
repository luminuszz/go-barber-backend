import { Router } from 'express';
import multer from 'multer';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAth';
import uploadConfig from '@Config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';
import userValidateCreate from '../validators/usersValidate';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', userValidateCreate, usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
