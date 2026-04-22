import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from '../clase/clase.entity';
import { Usuario } from '../usuario/usuario.entity';
import { ReservaController } from './reserva.controller';
import { Reserva } from './reserva.entity';
import { ReservaService } from './reserva.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Usuario, Clase])],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
