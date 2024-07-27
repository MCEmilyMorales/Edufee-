import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { PaymentDetailModule } from './modules/payment/payment.module';
import { PaymentOrderModule } from './modules/payment-order/payment-order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendMailsModule } from './modules/send-mails/send-mails.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { FilesModule } from './modules/files/files.module';

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
    SendMailsModule,
    StripeModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
