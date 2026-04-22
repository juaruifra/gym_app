import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { EntrenadorModule } from './entrenador/entrenador.module';
import { ClaseModule } from './clase/clase.module';
import { ReservaModule } from './reserva/reserva.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // La conexión se toma del .env para no acoplar credenciales al código.
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      timezone: process.env.DB_TIMEZONE ?? 'Z',
      autoLoadEntities: true,
      // En desarrollo crea/actualiza tablas automáticamente.
      synchronize: true,
    }),
    UsuarioModule,
    EntrenadorModule,
    ClaseModule,
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Formato único para todos los errores de la API.
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}