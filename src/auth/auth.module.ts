import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    UsuarioModule, // necesario para usar UsuarioService en AuthService
    JwtModule.registerAsync({
      global: true, // global: true hace que JwtService esté disponible en toda la app sin reimportar
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          // StringValue es el tipo aceptado (ej. '1d', '12h'); el cast es necesario por el tipado estricto de la librería.
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '1d') as import('@nestjs/jwt').JwtSignOptions['expiresIn'],
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
