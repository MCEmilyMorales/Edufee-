import { Injectable } from '@nestjs/common';
import { SendMailsRepository } from './send-mails.repository';
import { SendEmailDto } from './dto/welcome-mails.dto';

@Injectable()
export class SendMailsService {
  constructor(private readonly sendMailsRepository: SendMailsRepository) {}

  sendEmail(user: SendEmailDto): Promise<void> {
    return this.sendMailsRepository.sendEmail(user);
  }
  sendContactEmail(user: SendEmailDto): Promise<void> {
    return this.sendMailsRepository.sendContactEmail(user);
  }
}
