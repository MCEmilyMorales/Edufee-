import { Injectable } from '@nestjs/common';
import { SendMailsRepository } from './send-mails.repository';

@Injectable()
export class SendMailsService {
  constructor(private readonly sendMailsRepository: SendMailsRepository) {}

  sendEmail(user: any, jwt: string): Promise<void> {
    return this.sendMailsRepository.sendEmail(user, jwt);
  }
}
