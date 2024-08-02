import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './userDtos/createUsers.dto';
import { updateUserDto } from './userDtos/updateUser.dto';
import { JwtService } from '@nestjs/jwt';

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

  async signIn(email: string) {
    const userId = await this.usersRepository.findOneBy({ email: 'email' });
    if (!userId) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const userPayload = {
      email: userId.email,
      roles: [], // buscar el rol de la base de datos
    };
    const token = this.jwtService.sign(userPayload);
    console.log('token nuevo: ', token);
    return { message: 'Usuario logueado correctamente', token };
  }

  async updateUser(id: string, user: updateUserDto) {
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });

    return updateUser;
  }
}
