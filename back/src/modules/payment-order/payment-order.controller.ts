import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateOrderDto } from './payment-orderdto/createorder.dto';
import { PaymentOrder } from './paymentOrder.entity';
import { PaymentOrderService } from './payment-order.service';

@Controller('orders')
export class PaymentOrderController {
  constructor(private readonly paymentOrderService: PaymentOrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<PaymentOrder> {
    return this.paymentOrderService.createOrder(createOrderDto);
  }
  @Get(':orderId')
  async findOrderById(orderId: string) {
    return this.paymentOrderService.findOrderById(orderId);
  }
}
