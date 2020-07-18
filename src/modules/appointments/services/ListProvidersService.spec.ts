import 'reflect-metadata';

import ListProvidersService from '@modules/appointments/services/ListProviderService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'Teste@gamil.com',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'Teste teste2',
      email: 'Teste2@gamil.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Teste teste4',
      email: 'Teste4@gamil.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);
  });
});