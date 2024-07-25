import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { PaymentDetailModule } from './modules/payment/payment.module';
import { PaymentOrderModule } from './modules/payment-order/payment-order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    InstitutionModule,
    PaymentDetailModule,
    PaymentOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
