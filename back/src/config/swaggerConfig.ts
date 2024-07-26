import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Edufee')
  .setDescription(
    'Este es un proyecto para el último módulo de Henry y la empresa Edufee en conjunto, consiste en un gestor de pago para instituciones.',
  )
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
