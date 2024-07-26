import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { User } from './users.entity';
import { userDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.usersService.getAll(Number(page), Number(limit));
  }

  getId(@Param() id: string) {
    return;
  }

  // @Post('signup')
  // signUp(@Body() user: userDto) {
  //   return this.usersService.signUp(user);
  // }

  @Put()
  updateUser(@Param() id: string) {
    return this.usersService.updateUser();
  }
}
