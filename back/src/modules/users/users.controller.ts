import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { createUserDto, EmailUserDto } from './userDtos/createUsers.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { updateUserDto } from './userDtos/updateUser.dto';

@ApiTags('Estudiantes')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.admin || Role.institution)
  @UseGuards(RolesGuard)
  getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.usersService.getAll(Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @Get(':id')
  getId(@Param('id') id: string) {
    return this.usersService.getId(id);
  }

  @ApiBearerAuth()
  @Post('signup')
  signUp(@Body() user: createUserDto) {
    return this.usersService.signUp(user);
  }

  @ApiBearerAuth()
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: updateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }
}
