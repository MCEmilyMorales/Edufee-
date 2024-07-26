import { Injectable } from '@nestjs/common';
import { transporter } from 'src/config/mailer';
// import { User } from './entities/user.entity';  // Asegúrate de importar la entidad User según tu estructura de proyecto

@Injectable()
export class SendMailsRepository {
  constructor() {}

  async sendEmail(user: any, jwt: string): Promise<void> {
    await transporter.sendMail({
      from: '"Edufee" <paymyacademic@gmail.com>', // Cambia el remitente
      to: user.email, // Lista de receptores
      subject: '¡Bienvenido a Edufee!', // Asunto del correo
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #FFA500;">¡Gracias por registrarte, <span style="color: #FFD700;">${user.name}</span>!</h2>
          <p>Estamos emocionados de tenerte con nosotros en Edufee, donde facilitamos la gestión de pagos educativos.</p>
          <p>Para completar tu registro, por favor haz clic en el siguiente botón:</p>
          <a href="https://edufee.com/profile/activate?token=${jwt}" style="text-decoration: none;">
            <button style="background: linear-gradient(90deg, #FFD700, #FFA500); color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Activa tu cuenta
            </button>
          </a>
          <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>
          <p>¡Gracias!</p>
          <p>El equipo de Edufee 🧡</p>
        </div>
        <style>
          a:hover button {
            cursor: pointer;
          }
        </style>
      `,
    });
  }
}
