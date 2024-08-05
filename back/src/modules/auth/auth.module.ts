import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '../institution/institution.entity';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
