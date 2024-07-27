import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FilesService],
  controllers: [FilesController, FilesRepository],
})
export class FilesModule {}
