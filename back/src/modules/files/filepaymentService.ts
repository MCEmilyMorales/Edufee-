import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository'; // Ajusta la ruta según sea necesario
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class FilePaymentService {
  constructor(private readonly filesRepository: FilesRepository) {}

  async uploadPdf(file: Express.Multer.File): Promise<UploadApiResponse> {
    return this.filesRepository.uploadImage(file);
  }
}
