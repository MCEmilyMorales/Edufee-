import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './userDtos/createUsers.dto';
import { updateUserDto } from './userDtos/updateUser.dto';
import { User } from './users.entity';
import { SendMailsRepository } from '../send-mails/send-mails.repository';
import { Institution } from '../institution/institution.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,

    private readonly sendEmailRepository: SendMailsRepository,
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
    const { email, dni, institutionName } = user;
    //busco la institution por nombre en su tabla
    const institution = await this.institutionRepository.findOneBy({
      name: institutionName,
    });
    if (!institution) {
      throw new NotFoundException('Institución no encontrada. ');
    }
    //verifico que el email no exista en institution
    const existEmailInstitution = await this.institutionRepository.findOneBy({
      email,
    });
    if (existEmailInstitution) {
      throw new ConflictException();
    }
    //ej de paralizacion
    const [existsEmail, existsDni] = await Promise.all([
      this.usersRepository.findOneBy({
        email,
      }),
      this.usersRepository.findOneBy({
        dni,
      }),
    ]);

    const handleConflictException = (field: string, value: any) => {
      throw new ConflictException({
        status: 'error',
        code: 409,
        message: `El ${field} ya existe en nuestra base de datos.`,
        details: { field, value },
      });
    };

    if (existsEmail) {
      handleConflictException('email', email);
    }

    if (existsDni) {
      handleConflictException('dni', dni);
    }

    const usernew = this.usersRepository.create({ ...user, institution });

    const savedUser = await this.usersRepository.save(usernew);
    console.log(savedUser);

    await this.sendEmailRepository.sendEmail({
      name: savedUser.name,
      email: savedUser.email,
    });
    const { isAdmin, ...rest } = savedUser;
    return {
      message: 'Estudiante registrado exitosamente.',
      data: rest,
    };
  }

  async updateUser(id: string, user: updateUserDto) {
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser) {
      throw new NotFoundException({
        status: 'error',
        code: 404,
        message: 'El usuario no existe en nuestra base de datos.',
      });
    }

    await this.usersRepository.update(id, user);

    // Retorna el usuario actualizado
    const updatedUser = await this.usersRepository.findOneBy({ id });
    return updatedUser;
  }
}
