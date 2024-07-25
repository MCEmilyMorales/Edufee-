import { Module } from '@nestjs/common';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';
import { InstitutionRepository } from './institution.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])],
  controllers: [InstitutionController],
  providers: [InstitutionService, InstitutionRepository],
})
export class InstitutionModule {}
