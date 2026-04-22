import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validamos todo lo que entra a la API desde un único punto.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // Si llegan campos no esperados, devolvemos 400 para evitar basura en BD.
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger solo en desarrollo para no exponer docs en producción.
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('Gym App API')
      .setDescription('Documentación del backend Nest.js de Gym App')
      .setVersion('1.0.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      // Mantiene el token al recargar la página de Swagger.
      swaggerOptions: { persistAuthorization: true },
    });
  }

  const webserverPort = process.env.WEB_SERVER_PORT || '3000';
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server running on port ${webserverPort}. Swagger ${isDev ? 'enabled at /api/docs' : 'disabled'}`);
}
bootstrap();
