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
import { updateUserDto } from './userDtos/updateUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/enums';
import { RolesGuard } from 'src/guards/roles.guard';

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
  @Post('signin')
  signIn(@Body() emailUserDto: EmailUserDto) {
    return this.usersService.signIn(emailUserDto);
  }

  @ApiBearerAuth()
  @Put(':id')
  updateUser(
    @Param(`id`, ParseUUIDPipe) id: string,
    @Body() user: updateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }
}
