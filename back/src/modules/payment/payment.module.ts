import { Module } from '@nestjs/common';
import { PaymentDetailController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentsRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { User } from '../users/users.entity';
import { Institution } from '../institution/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Institution])],
  controllers: [PaymentDetailController],
  providers: [PaymentService, PaymentsRepository],
})
export class PaymentModule {}
