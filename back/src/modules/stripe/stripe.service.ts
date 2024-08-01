import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(@Inject(Stripe) private readonly stripeClient: Stripe) {}

  async createCustomer(email: string, name: string) {
    return this.stripeClient.customers.create({
      email,
      name,
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    return this.stripeClient.paymentIntents.create({
      amount,
      currency,
    });
  }
}
