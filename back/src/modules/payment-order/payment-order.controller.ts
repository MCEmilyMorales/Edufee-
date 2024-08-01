import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateOrderDto } from './payment-orderdto/createorder.dto';
import { PaymentOrder } from './paymentOrder.entity';
import { PaymentOrderService } from './payment-order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class PaymentOrderController {
  constructor(private readonly paymentOrderService: PaymentOrderService) {}

  @ApiBearerAuth()
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<PaymentOrder> {
    return this.paymentOrderService.createOrder(createOrderDto);
  }

  @ApiBearerAuth()
  @Get(':orderId')
  async findOrderById(orderId: string) {
    return this.paymentOrderService.findOrderById(orderId);
  }
}
