import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentDetailController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get('id')
  getPaymentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.getPaymentById(id);
  }

  @Get()
  getAllPayments(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.paymentService.getAllPayments(Number(page), Number(limit));
  }

  @Post()
  handleTest(@Body() body: any) {
    console.log('Received data:', body); // Aquí se imprime cualquier dato recibido
    return { status: 'success', data: body }; // Devuelve los datos recibidos como respuesta
  }
}
