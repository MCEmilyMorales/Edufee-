import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from '../institution/institution.entity';
import { User } from '../users/users.entity';
import { EmailUserDto } from '../users/userDtos/createUsers.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Institution)
    private readonly institucionRepository: Repository<Institution>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(emailUserDto: EmailUserDto) {
    const { email } = emailUserDto;
    let user = await this.userRepository.findOneBy({ email });

    if (user) {
      const payload = {
        email: user.email,
        id: user.id,
        roles: [user.role],
      };
      const token = this.jwtService.sign(payload);
      return { message: 'Estudiante logueado', token };
    }

    const institution = await this.institucionRepository.findOneBy({ email });

    if (institution) {
      const payload = {
        email: institution.email,
        roles: [institution.role],
      };
      const token = this.jwtService.sign(payload);
      return { message: 'Institución logueada', token };
    }

    return { message: 'Usuario no encontrado' };
  }
}
