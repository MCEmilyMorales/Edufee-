import { Module } from '@nestjs/common';
import { PaymentDetailController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentsRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentDetailController],
  providers: [PaymentService, PaymentsRepository],
})
export class PaymentModule {}
