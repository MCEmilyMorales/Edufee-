import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payment.repository';
import { PaymentDto } from './payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentsRepository) {}

  getPaymentById(id: string) {
    return this.paymentRepository.getPaymentById(id);
  }

  getAllPayments(page: number, limit: number) {
    return this.paymentRepository.getAllPayments(page, limit);
  }

  registerPayment(paymentDto: PaymentDto) {
    return this.paymentRepository.registerPayment(paymentDto);
  }
}
