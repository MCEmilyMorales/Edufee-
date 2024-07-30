import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './payment-orderdto/createorder.dto';
import { PaymentOrderRepository } from './payment-order.repository';

@Injectable()
export class PaymentOrderService {
  constructor(
    private readonly paymentOrderRepository: PaymentOrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.paymentOrderRepository.createOrder(createOrderDto);
  }
  async findOrderById(orderId: string) {
    return this.paymentOrderRepository.findOrderById(orderId);
  }
}
