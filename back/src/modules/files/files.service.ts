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

  async uploadImage(file: Express.Multer.File, userId: string) {
    // Verificar que exista el usuario
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Subir la imagen
    const response = await this.filesRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('Error al subir imagen en Cloudinary');
    }

    // Actualizar la imagen del perfil del usuario
    try {
      await this.usersRepository.update(userId, {
        imgProfile: response.secure_url,
      });
    } catch (error) {
      throw new NotFoundException('Error al actualizar la imagen del usuario');
    }

    // Obtener y retornar el usuario actualizado
    const updatedUser = await this.usersRepository.findOneBy({ id: userId });
    if (!updatedUser) {
      throw new NotFoundException(
        'Usuario no encontrado después de la actualización',
      );
    }

    return updatedUser;
  }
}
