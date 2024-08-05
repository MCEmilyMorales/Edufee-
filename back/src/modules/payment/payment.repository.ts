import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async getAllPayments(page: number, limit: number) {
    const allPayments = await this.paymentRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return allPayments;
  }

  async getPaymentById(id: string) {
    const getPayment = await this.paymentRepository.findOneBy({ id });
    if (!getPayment) {
      throw new NotFoundException('Pago no encontrado con este ID');
    }
    return getPayment;
  }
}
