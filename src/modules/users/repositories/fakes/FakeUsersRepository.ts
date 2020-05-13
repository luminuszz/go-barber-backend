import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

type Response = User | undefined;

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<Response> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<Response> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, {
      id: uuid(),
      name,
      email,
      password,
    });

    this.users.push(newUser);

    return newUser;
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
