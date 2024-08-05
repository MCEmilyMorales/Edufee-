import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendMailsModule } from './modules/send-mails/send-mails.module';
// import { StripeModule } from './modules/stripe/stripe.module';
import { FilesModule } from './modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

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
    PaymentModule,
    SendMailsModule,
    // StripeModule,
    FilesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
