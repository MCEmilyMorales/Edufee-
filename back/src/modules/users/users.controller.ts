import { Controller, Get, Put, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UUID } from 'crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  post() {
    return;
  }

  @Put()
  updateUser(@Param() id: UUID) {
    return this.usersService.updateUser();
  }

  
}
