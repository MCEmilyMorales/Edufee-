import { Injectable } from '@nestjs/common';
import { SendMailsRepository } from './send-mails.repository';
import { SendEmailDto } from './dto/welcome-mails.dto';
import { ContactEmailDto } from './dto/contact-mails';

@Injectable()
export class SendMailsService {
  constructor(private readonly sendMailsRepository: SendMailsRepository) {}

  sendEmail(user: SendEmailDto): Promise<void> {
    return this.sendMailsRepository.sendEmail(user);
  }
  sendContactEmail(user: ContactEmailDto): Promise<void> {
    return this.sendMailsRepository.sendContactEmail(user);
  }
  sendReviewEmail(user: any): Promise<void> {
    return this.sendMailsRepository.sendReviewEmail(user);
  }
  sendApprovalEmail(user: any): Promise<void> {
    return this.sendMailsRepository.sendApprovalEmail(user);
  }
  sendRejectionEmail(user: any): Promise<void> {
    return this.sendMailsRepository.sendRejectionEmail(user);
  }
}
