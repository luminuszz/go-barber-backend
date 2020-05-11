import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('Email or password does not match');
    }

    const passwordDoesMatch = await compare(password, user.password);

    if (!passwordDoesMatch) {
      throw new Error('Email or password does not match');
    }
    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({ name: user.name }, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
