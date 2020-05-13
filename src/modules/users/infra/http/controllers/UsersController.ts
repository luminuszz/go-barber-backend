import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const { name, email, password } = req.body;

    const newUser = await createUserService.execute({ email, name, password });
    delete newUser.password;

    return res.json(newUser);
  }
}

export default UsersController;
