import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestExpressApplication para especificar que usamos Express (por defecto)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // usar pipes de validación globales 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true, // rechaza campos extra con 400
    }),
  );

  // Config de Swagger (sólo en desarrollo)
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
      swaggerOptions: { persistAuthorization: true }, // para mantener el token al recargar
    });
  }

  const webserverPort = process.env.WEB_SERVER_PORT || '3000';
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Server running on port ${webserverPort}. Swagger ${isDev ? 'enabled at /api/docs' : 'disabled'}`);
}
bootstrap();
