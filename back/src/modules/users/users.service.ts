import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAll(page: number, limit: number) {
    return this.usersRepository.getAll(page, limit);
  }

  getId(id: string) {
    return this.usersRepository.getId(id);
  }

  //   signUp(user){
  //     return this.usersRepository.signUp(user)
  //   }

  updateUser() {
    return this.usersRepository.updateUser();
  }
}
