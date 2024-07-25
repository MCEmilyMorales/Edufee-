import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

import { InstitutionModule } from './modules/institution/institution.module';
import { PaymentDetailModule } from './modules/payment/payment.module';
import { PaymentOrderModule } from './modules/payment-order/payment-order.module';

@Module({
  imports: [
    UsersModule,
    InstitutionModule,
    PaymentDetailModule,
    PaymentOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
