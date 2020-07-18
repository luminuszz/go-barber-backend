import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const { name, email, password } = req.body;

    const newUser = await createUserService.execute({ email, name, password });

    return res.json(classToClass(newUser));
  }
}

export default UsersController;
