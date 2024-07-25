import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Edufee')
    .setDescription(
      'Este es un proyecto para el último módulo de Henry y la empresa Edufee en conjunto, consiste en un gestor de pago para instituciones.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Server listening on http://localhost:3000');
}
bootstrap();
