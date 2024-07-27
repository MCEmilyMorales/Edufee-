import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';

@Module({
  providers: [FilesService],
  controllers: [FilesController, FilesRepository],
})
export class FilesModule {}
