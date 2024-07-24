import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { CareerModule } from './modules/career/career.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { PaymentDetailModule } from './modules/payment-detail/payment-detail.module';
import { PaymentOrderModule } from './modules/payment-order/payment-order.module';

@Module({
  imports: [
    UsersModule,
    CareerModule,
    InstitutionModule,
    PaymentDetailModule,
    PaymentOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
