import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfileService = container.resolve(ShowProfileService);

    const findUser = await showProfileService.execute({ user_id });

    delete findUser.password;

    return res.json(findUser);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, old_Password, password } = req.body;
    const user_id = req.user.id;
    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      user_id,
      email,
      name,
      old_Password,
      password,
    });

    delete user.password;

    return res.json(user);
  }
}

export default ProfileController;
