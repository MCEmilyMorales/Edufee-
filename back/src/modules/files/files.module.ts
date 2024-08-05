import { Module } from '@nestjs/common';
import { FilesUserService } from './filesUser.service';
import { FilesUserController } from './filesUser.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { Institution } from '../institution/institution.entity';
import { FilesInstitutionService } from './filesInstitution.service';
import { FilesInstitutionController } from './filesInsitution.controller';
import { filePaymentController } from './filespaymentController';
import { FilePaymentService } from './filepaymentService';
import { FilesRepository } from './files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Institution])],
  providers: [
    FilesUserService,
    FilesInstitutionService,
    FilePaymentService,
    FilesRepository,
    CloudinaryConfig,
  ],
  controllers: [
    FilesUserController,
    FilesInstitutionController,
    filePaymentController,
  ],
})
export class FilesModule {}
