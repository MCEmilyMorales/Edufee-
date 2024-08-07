import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './payment.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/enums/enums';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentDetailController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBearerAuth()
  @Roles(Role.admin, Role.student, Role.institution)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('id')
  getPaymentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentService.getPaymentById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.admin, Role.student, Role.institution)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAllPayments(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.paymentService.getAllPayments(Number(page), Number(limit));
  }

  // @Post()
  // handleTest(@Body() body: any) {
  //   console.log('Received data:', body); // Aquí se imprime cualquier dato recibido
  //   return { status: 'success', data: body }; // Devuelve los datos recibidos como respuesta
  // }

  @Post('register')
  async registerPayment(@Body() paymentDto: PaymentDto) {
    return this.paymentService.registerPayment(paymentDto);
  }
}
