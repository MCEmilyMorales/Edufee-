import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Module({
  imports: [ConfigModule],
  controllers: [StripeController],
  providers: [
    StripeService,
    {
      provide: Stripe,
      useFactory: (configService: ConfigService) => {
        return new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
          apiVersion: '2024-06-20',
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class StripeModule {}
