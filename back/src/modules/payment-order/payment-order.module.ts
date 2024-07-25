import { Module } from '@nestjs/common';
import { PaymentOrderController } from './payment-order.controller';
import { PaymentOrderService } from './payment-order.service';

@Module({
  controllers: [PaymentOrderController],
  providers: [PaymentOrderService],
})
export class PaymentOrderModule {}
