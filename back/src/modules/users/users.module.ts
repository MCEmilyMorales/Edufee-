import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { SendMailsRepository } from '../send-mails/send-mails.repository';
import { Institution } from '../institution/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Institution])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, SendMailsRepository],
})
export class UsersModule {}
