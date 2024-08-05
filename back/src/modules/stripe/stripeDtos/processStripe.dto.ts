import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProcessStripeDto {
  @IsString()
  @IsOptional()
  paymentMethodId: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
}
