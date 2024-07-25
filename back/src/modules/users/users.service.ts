import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAll() {
    return this.usersRepository.getAll();
  }

  updateUser(){
    return this.usersRepository.updateUser()
  }
}
