import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async uploadImage(file: Express.Multer.File, UseriD: string) {
    //verificar que exista el producto:
    const user = await this.usersRepository.findOneBy({ id: User });
    if (!user) {
      throw new NotFoundException('user no encontrado');
    }
    const response = await this.filesRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('Error al subir imagen en Cloudinary');
    }
    //actualizar la imagen
    // falta manejar el error aca
    await this.usersRepository.update(UseriD, {
      ImgUrl: response.secure_url,
    });
    const updateUser = await this.usersRepository.findOneBy({
      id: UseriD,
    });
    return updateUser;
  }
}
