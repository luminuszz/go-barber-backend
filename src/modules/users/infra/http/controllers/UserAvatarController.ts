import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UsersController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateAvatarService.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  }
}

export default UsersController;
