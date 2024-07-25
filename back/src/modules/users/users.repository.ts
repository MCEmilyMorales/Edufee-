import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor() {}
  getAll() {
    return 'todos los usuarios';
  }
  updateUser(){
    return 'Para actualizar usuario'
  }
}
