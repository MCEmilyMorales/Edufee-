import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentOrder } from './paymentOrder.entity';
import { User } from '../users/users.entity';
import { CreateOrderDto } from './payment-orderdto/createorder.dto';
import { Institution } from '../institution/institution.entity';

@Injectable()
export class PaymentOrderRepository {
  private readonly logger = new Logger(PaymentOrderRepository.name);

  constructor(
    @InjectRepository(PaymentOrder)
    private readonly orderRepository: Repository<PaymentOrder>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<PaymentOrder> {
    const { estado, userId, accountNumber, monto } = createOrderDto;

    this.logger.debug(
      `Starting createOrder with DTO: ${JSON.stringify(createOrderDto)}`,
    );

    try {
      // Verifica si el usuario existe
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        this.logger.error(`User with ID ${userId} not found`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Verifica si la institución existe
      const institution = await this.institutionRepository.findOne({
        where: { accountNumber: accountNumber },
      });
      if (!institution) {
        this.logger.error(
          `Institution with account number ${accountNumber} not found`,
        );
        throw new HttpException('Institution not found', HttpStatus.NOT_FOUND);
      }

      // Crea una nueva orden de pago
      const order = new PaymentOrder();
      order.estado = estado || 'Pendiente'; // Si no se proporciona estado, establece 'Pendiente'
      order.monto = monto;
      order.user = user;
      order.institution = institution;

      // Guarda la orden en la base de datos
      const savedOrder = await this.orderRepository.save(order);
      this.logger.debug(`Order saved: ${JSON.stringify(savedOrder)}`);

      return savedOrder;
    } catch (error) {
      this.logger.error(`Error creating order: ${error.message}`, error.stack);
      // Lanza el error original para obtener detalles más específicos
      throw new HttpException(
        error.message || 'Error creating order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findOrderById(orderId: string): Promise<PaymentOrder> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user', 'institution'], // Si necesitas incluir relaciones
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }
}
