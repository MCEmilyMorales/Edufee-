import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';

import { InstitutionModule } from './modules/institution/institution.module';
import { PaymentDetailModule } from './modules/payment/payment.module';
import { PaymentOrderModule } from './modules/payment-order/payment-order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './modules/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
