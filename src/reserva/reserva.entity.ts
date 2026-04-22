import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from '../common/enums/estado-reserva.enum';
import { Clase } from '../clase/clase.entity';
import { Usuario } from '../usuario/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservas')
export class Reserva {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: '2026-04-22T10:00:00.000Z' })
  @CreateDateColumn({ name: 'fecha_reserva' })
  fechaReserva!: Date;

  @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.ACTIVA })
  @Column({ type: 'enum', enum: EstadoReserva, default: EstadoReserva.ACTIVA })
  estado!: EstadoReserva;

  @ApiProperty({ example: 1 })
  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId!: number;

  @ApiProperty({ example: 1 })
  @Column({ name: 'clase_id', type: 'int' })
  claseId!: number;

  // Cada reserva pertenece a un único usuario.
  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  // Cada reserva apunta a una única clase.
  @ManyToOne(() => Clase, (clase) => clase.reservas, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'clase_id' })
  clase!: Clase;
}
