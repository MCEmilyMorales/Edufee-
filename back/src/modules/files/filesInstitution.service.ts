import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from '../institution/institution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesInstitutionService {
  constructor(
    private readonly filesRepository: FilesRepository,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async uploadImages(
    logoFile: Express.Multer.File,
    bannerFile: Express.Multer.File,
    institutionId: string,
  ) {
    // Verificar que exista la institución
    const institution = await this.institutionRepository.findOneBy({
      id: institutionId,
    });
    if (!institution) {
      throw new NotFoundException('Institución no encontrada');
    }

    // Subir el logo
    const logoResponse = logoFile
      ? await this.filesRepository.uploadImage(logoFile)
      : null;
    if (logoFile && !logoResponse?.secure_url) {
      throw new NotFoundException('Error al subir el logo en Cloudinary');
    }

    // Subir el banner
    const bannerResponse = bannerFile
      ? await this.filesRepository.uploadImage(bannerFile)
      : null;
    if (bannerFile && !bannerResponse?.secure_url) {
      throw new NotFoundException('Error al subir el banner en Cloudinary');
    }

    // Actualizar la imagen del logo y banner de la institución
    try {
      await this.institutionRepository.update(institutionId, {
        logo: logoResponse?.secure_url,
        banner: bannerResponse?.secure_url,
      });
    } catch (error) {
      throw new NotFoundException(
        'Error al actualizar el logo y el banner de la institución',
      );
    }

    const updatedInstitution = await this.institutionRepository.findOneBy({
      id: institutionId,
    });
    if (!updatedInstitution) {
      throw new NotFoundException(
        'Institución no encontrada después de la actualización',
      );
    }

    return updatedInstitution;
  }
}
