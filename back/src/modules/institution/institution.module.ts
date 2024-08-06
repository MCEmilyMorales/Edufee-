import { Module } from '@nestjs/common';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';
import { InstitutionRepository } from './institution.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { SendMailsRepository } from '../send-mails/send-mails.repository';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, User])],
  controllers: [InstitutionController],
  providers: [InstitutionService, InstitutionRepository, SendMailsRepository],
})
export class InstitutionModule {}
