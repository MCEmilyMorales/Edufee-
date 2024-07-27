import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUserService } from './filesUser.service';

@Controller('files')
export class FilesUserController {
  constructor(private readonly fileUploadService: FilesUserService) {}

  @Post('uploadUserImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Supera el maximo permitido: 200kb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.jpeg|.webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, userId);
  }
}
