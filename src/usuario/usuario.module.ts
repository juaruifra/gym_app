import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

// Registra el repositorio de Usuario y exporta el servicio para que AuthModule lo use.
@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], // AuthService lo necesita para buscar usuarios por email.
})
export class UsuarioModule {}
