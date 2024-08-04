import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto, EmailUserDto } from './userDtos/createUsers.dto';
import { updateUserDto } from './userDtos/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getAll(page: number, limit: number) {
    const allUser = await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { allUser, page, limit };
  }

  async getId(id: string) {
    const getId = await this.usersRepository.findOneBy({ id });
    if (!getId) {
      throw new NotFoundException('Usuario con Id no encontrado.');
    }
    return getId;
  }

  async signUp(user: createUserDto) {
    const usernew = await this.usersRepository.save(user);

    return usernew;
  }

  async signIn(emailUserDto: EmailUserDto) {
    if (!emailUserDto) {
      throw new BadRequestException('Email es requerido');
    }
    const { email } = emailUserDto;
    const emailUser = await this.usersRepository.findOneBy({
      email,
    });
    console.log('Email encontrado:', emailUser);

    if (!emailUser) {
      throw new BadRequestException(
        'No se encontro el estudiante con ese email',
      );
    }
    const payload = {
      email: emailUser.email,
      roles: [emailUser.role],
    };
    const token = this.jwtService.sign(payload);
    return { message: 'Estudiante logueado correctamente', token };
  }

  async updateUser(id: string, user: updateUserDto) {
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });

    return updateUser;
  }
}
