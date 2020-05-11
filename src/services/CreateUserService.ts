import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const checkUser = await userRepository.findOne({ where: { email } });

    if (checkUser) {
      throw new Error('Email addres already used');
    }

    const newUser = userRepository.create({
      name,
      email,
      password,
    });
    await userRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
