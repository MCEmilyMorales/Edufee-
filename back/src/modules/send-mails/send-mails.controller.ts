import { Controller, Post, Body } from '@nestjs/common';
import { SendMailsService } from './send-mails.service';
import { SendEmailDto } from './dto/welcome-mails.dto';
import { ContactEmailDto } from './dto/contact-mails';

@Controller('send-mails')
export class SendMailsController {
  constructor(private readonly sendMailsService: SendMailsService) {}

  @Post('welcome')
  async sendWelcomeEmail(@Body() body: SendEmailDto) {
    const user = {
      email: body.email,
      name: body.name,
    };
    // const jwt = body.jwt;

    await this.sendMailsService.sendEmail(user);
    return { message: 'Correo de bienvenida enviado correctamente' };
  }
  @Post('contact')
  async sendContactEmail(@Body() body: ContactEmailDto) {
    const user = {
      email: body.email,
      name: body.name,
      message: body.message,
    };
    // const jwt = body.jwt;
    await this.sendMailsService.sendContactEmail(user);
    return { message: 'Correo de contacto enviado correctamente' };
  }
}
