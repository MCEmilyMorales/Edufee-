import { Module } from '@nestjs/common';
import { PaymentDetailController } from './payment-detail.controller';
import { PaymentDetailService } from './payment-detail.service';

@Module({
  controllers: [PaymentDetailController],
  providers: [PaymentDetailService],
})
export class PaymentDetailModule {}
