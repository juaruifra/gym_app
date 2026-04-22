import { ApiProperty } from '@nestjs/swagger';
import { EstadoClase } from '../common/enums/estado-clase.enum';
import { Entrenador } from '../entrenador/entrenador.entity';
import { Reserva } from '../reserva/reserva.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clases')
export class Clase {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Spinning Avanzado' })
  @Column({ type: 'varchar', length: 120 })
  nombre!: string;

  @ApiProperty({ example: 'Clase de alta intensidad de 45 minutos', required: false })
  @Column({ type: 'text', nullable: true })
  descripcion!: string | null;

  @ApiProperty({ example: '2026-04-23' })
  @Column({ type: 'date' })
  fecha!: string;

  @ApiProperty({ example: '18:00:00' })
  @Column({ name: 'hora_inicio', type: 'time' })
  horaInicio!: string;

  @ApiProperty({ example: '18:45:00' })
  @Column({ name: 'hora_fin', type: 'time' })
  horaFin!: string;

  @ApiProperty({ example: 20 })
  @Column({ name: 'aforo_maximo', type: 'int' })
  aforoMaximo!: number;

  @ApiProperty({ example: 20 })
  @Column({ name: 'plazas_disponibles', type: 'int' })
  plazasDisponibles!: number;

  @ApiProperty({ enum: EstadoClase, example: EstadoClase.ACTIVA })
  @Column({ type: 'enum', enum: EstadoClase, default: EstadoClase.ACTIVA })
  estado!: EstadoClase;

  @ApiProperty({ example: 1 })
  @Column({ name: 'entrenador_id', type: 'int' })
  entrenadorId!: number;

  @ManyToOne(() => Entrenador, (entrenador) => entrenador.clases, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'entrenador_id' })
  entrenador!: Entrenador;

  @OneToMany(() => Reserva, (reserva) => reserva.clase)
  reservas!: Reserva[];
}
