import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

import { updateUserDto } from './userDtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAll(page: number, limit: number) {
    return this.usersRepository.getAll(page, limit);
  }

  getId(id: string) {
    return this.usersRepository.getId(id);
  }

  signUp(user: any) {
    return this.usersRepository.signUp(user);
  }

  signIn(id: string) {
    return this.usersRepository.signIn(id);
  }

  updateUser(id: string, user: updateUserDto) {
    return this.usersRepository.updateUser(id, user);
  }
}
