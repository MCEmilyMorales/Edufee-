import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmailUserDto } from '../users/userDtos/createUsers.dto';

@ApiTags('Auth/signin')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth('Auth/signin')
  @Post('signin')
  findUserByEmail(@Body() emailUserDto: EmailUserDto) {
    return this.authService.findUserByEmail(emailUserDto);
  }
}
