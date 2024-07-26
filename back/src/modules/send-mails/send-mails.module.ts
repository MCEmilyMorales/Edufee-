import { Module } from '@nestjs/common';
import { SendMailsController } from './send-mails.controller';
import { SendMailsService } from './send-mails.service';
import { SendMailsRepository } from './send-mails.repository';

@Module({
  controllers: [SendMailsController],
  providers: [SendMailsService, SendMailsRepository],
})
export class SendMailsModule {}
