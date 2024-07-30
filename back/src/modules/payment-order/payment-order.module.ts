import { Module } from '@nestjs/common';
import { PaymentOrderController } from './payment-order.controller';
import { PaymentOrderService } from './payment-order.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { PaymentOrder } from './paymentOrder.entity';
import { PaymentOrderRepository } from './payment-order.repository';
import { Institution } from '../institution/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PaymentOrder, Institution])],
  controllers: [PaymentOrderController],
  providers: [PaymentOrderService, PaymentOrderRepository],
})
export class PaymentOrderModule {}
