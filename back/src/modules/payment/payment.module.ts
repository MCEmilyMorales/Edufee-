import { Module } from '@nestjs/common';
import { PaymentDetailController } from './payment.controller';
import { PaymentDetailService } from './payment.service';

@Module({
  controllers: [PaymentDetailController],
  providers: [PaymentDetailService],
})
export class PaymentDetailModule {}
