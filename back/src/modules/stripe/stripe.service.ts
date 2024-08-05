// import { BadRequestException, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import Stripe from 'stripe';
// import { CreateStripeDto } from './stripeDtos/createStripe.dto';
// import { ProcessStripeDto } from './stripeDtos/processStripe.dto';
// // import { CreatePaymentDto } from './create-payment.dto';

// @Injectable()
// export class StripeService {
//   private stripe: Stripe;
//   constructor(private configService: ConfigService) {
//     const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
//     if (!stripeSecretKey) {
//       throw new Error(
//         'La clave secreta de Stripe no está definida en las variables de entorno o es incorrecta',
//       );
//     }
//     this.stripe = new Stripe(stripeSecretKey, {
//       apiVersion: '2024-06-20',
//     });
//   }

//   async createPaymentIntent(createStripeDto: CreateStripeDto) {
//     const { amount, currency } = createStripeDto;
//     const amountInCents = Math.round(amount * 100);

//     try {
//       const paymentIntent = await this.stripe.paymentIntents.create({
//         amount: amountInCents,
//         currency,
//       });
//       return paymentIntent.client_secret;
//     } catch (error) {
//       throw new BadRequestException(
//         'Error al crear el intento de pago con Stripe',
//       );
//     }
//   }

//   async handleCardPayment(
//     processStripeDto: ProcessStripeDto,
//   ): Promise<Stripe.PaymentIntent> {
//     const { paymentMethodId, amount, currency } = processStripeDto;
//     const amountInCents = Math.round(amount * 100);

//     try {
//       const paymentIntent = await this.stripe.paymentIntents.create({
//         amount: amountInCents,
//         currency,
//         payment_method: paymentMethodId,
//         confirm: true,
//       });
//       return paymentIntent;
//     } catch (error) {
//       throw new BadRequestException(
//         'Error al procesar el pago con tarjeta con Stripe',
//       );
//     }
//   }

//   async getAllTransactions(
//     page: number = 1,
//     limit: number = 5,
//     date?: string,
//     amount?: number,
//   ) {
//     // const allCharges = await this.getA;
//   }
// }

// //   async createCustomer(email: string, name: string) {
// //     return this.stripeClient.customers.create({
// //       email,
// //       name,
// //     });
// //   }
