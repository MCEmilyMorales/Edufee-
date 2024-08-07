import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { PaymentDto } from './payment.dto';
import { User } from '../users/users.entity';
import { Institution } from '../institution/institution.entity';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
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
      throw new NotFoundException(`Pago no encontrado con este ID: ${id}`);
    }
    return getPayment;
  }

  async registerPayment(paymentDto: PaymentDto): Promise<Payment> {
    const { userId, institutionId, amount, pdfImage } = paymentDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException(
        `No existe un usuario con este ID: ${userId}`,
      );
    }

    const institution = await this.institutionRepository.findOneBy({
      id: institutionId,
    });
    if (!institution) {
      throw new BadRequestException(
        `No existe una institución con este ID: ${institutionId}`,
      );
    }

    const newPayment = new Payment();

    newPayment.date = new Date().toLocaleDateString();
    newPayment.amount = amount;
    newPayment.pdfImage = pdfImage;
    newPayment.user = user;
    newPayment.institution = institution;

    return await this.paymentRepository.save(newPayment);
  }
}
