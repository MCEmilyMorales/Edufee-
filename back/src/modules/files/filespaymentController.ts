import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePaymentService } from './filepaymentService';

@Controller('files')
export class filePaymentController {
  constructor(private readonly filesService: FilePaymentService) {}

  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el formulario
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    const result = await this.filesService.uploadPdf(file);
    return { url: result.secure_url }; // Retorna la URL del archivo subido
  }
}
