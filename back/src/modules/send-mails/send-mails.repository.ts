import { Injectable } from '@nestjs/common';
import { transporter } from 'src/config/mailer';
import { SendEmailDto } from './dto/welcome-mails.dto';

@Injectable()
export class SendMailsRepository {
  constructor() {}

  async sendEmail(user: SendEmailDto): Promise<void> {
    await transporter.sendMail({
      from: '"Edufee" <paymyacademic@gmail.com>', // Cambia el remitente
      to: user.email, // Lista de receptores
      subject: '¡Bienvenido a Edufee!', // Asunto del correo
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #FFA500;">¡Gracias por registrarte, <span style="color: #FFD700;">${user.name}</span>!</h2>
        <p>Estamos emocionados de tenerte con nosotros en Edufee, donde facilitamos la gestión de pagos educativos.</p>
        <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
        <p>¡Gracias!</p>
        <p>El equipo de Edufee 🧡</p>
      </div>
    `,
    });
  }

  async sendContactEmail(user: any): Promise<void> {
    await transporter.sendMail({
      from: '"Edufee" <paymyacademic@gmail.com>', // Cambia el remitente
      to: user.email, // Lista de receptores
      subject: '¡Gracias por contactarnos!', // Asunto del correo
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #FFA500;">¡Gracias por contactarnos, <span style="color: #FFD700;">${user.name}</span>!</h2>
        <p>Apreciamos tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
        <p>Si tienes alguna pregunta adicional, no dudes en responder a este correo.</p>
        <p>¡Gracias!</p>
        <p>El equipo de Edufee 🧡</p>
      </div>
    `,
    });
  }
  async sendReviewEmail(user: any): Promise<void> {
    await transporter.sendMail({
      from: '"Edufee" <paymyacademic@gmail.com>',
      to: user.email,
      subject: 'Tu cuenta está en revisión',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">Hola, <span style="color: #FFD700;">${user.name}</span></h2>
          <p>Tu cuenta está actualmente en revisión. Te notificaremos una vez que el proceso haya sido completado.</p>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <p>¡Gracias!</p>
          <p>El equipo de Edufee 🧡</p>
        </div>
      `,
    });
  }

  async sendApprovalEmail(user: any): Promise<void> {
    await transporter.sendMail({
      from: '"Edufee" <paymyacademic@gmail.com>',
      to: user.email,
      subject: '¡Tu cuenta ha sido aprobada!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Felicitaciones, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Tu cuenta ha sido aprobada y ya puedes comenzar a utilizar nuestros servicios.</p>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <p>¡Gracias!</p>
          <p>El equipo de Edufee 🧡</p>
        </div>
      `,
    });
  }
}
