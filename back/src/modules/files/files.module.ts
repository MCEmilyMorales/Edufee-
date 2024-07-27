import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FilesService, FilesRepository, CloudinaryConfig],
  controllers: [FilesController],
})
export class FilesModule {}
