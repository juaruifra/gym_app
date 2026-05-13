import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrenadorController } from './entrenador.controller';
import { Entrenador } from './entrenador.entity';
import { EntrenadorService } from './entrenador.service';

// Registra el repositorio de Entrenador y expone el servicio por si otro módulo lo necesita.
@Module({
  imports: [TypeOrmModule.forFeature([Entrenador])],
  controllers: [EntrenadorController],
  providers: [EntrenadorService],
  exports: [EntrenadorService],
})
export class EntrenadorModule {}
