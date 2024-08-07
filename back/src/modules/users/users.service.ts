import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

import { updateUserDto } from './userDtos/updateUser.dto';
import { User } from './users.entity';

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

  updateUser(id: string, user: updateUserDto) {
    return this.usersRepository.updateUser(id, user);
  }

  toRoleAdmin(id: string): Promise<User> {
    return this.usersRepository.toRoleAdmin(id);
  }

  changeStatus(id: string, status: boolean) {
    return this.usersRepository.changeStatus(id, status);
  }
}
