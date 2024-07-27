import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesInstitutionService } from './filesInstitution.service';

@Controller('files')
export class FilesInstitutionController {
  constructor(private readonly fileUploadService: FilesInstitutionService) {}

  @Post('uploadInstitutionImages/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  uploadInstitutionImages(
    @Param('id') institutionId: string,
    @UploadedFiles()
    files: { logo?: Express.Multer.File[]; banner?: Express.Multer.File[] },
  ) {
    const logoFile = files.logo?.[0];
    const bannerFile = files.banner?.[0];
    return this.fileUploadService.uploadImages(
      logoFile,
      bannerFile,
      institutionId,
    );
  }
}
