import { Request, Response } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import { container } from 'tsyringe';

class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const sessionsService = container.resolve(CreateSessionService);

    const { email, password } = req.body;

    const { user, token } = await sessionsService.execute({ email, password });

    delete user.password;

    return res.json({ user, token });
  }
}

export default SessionController;
