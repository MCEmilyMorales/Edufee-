import { Controller, Post, Body } from '@nestjs/common';
import { SendMailsService } from './send-mails.service';

@Controller('send-mails')
export class SendMailsController {
  constructor(private readonly sendMailsService: SendMailsService) {}

  @Post('welcome')
  async sendWelcomeEmail(
    @Body() body: { email: string; name: string; jwt: any },
  ) {
    const user = {
      email: body.email,
      name: body.name,
    };
    const jwt = body.jwt;

    await this.sendMailsService.sendEmail(user, jwt);
    return { message: 'Correo de bienvenida enviado correctamente' };
  }
}
