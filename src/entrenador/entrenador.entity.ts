import { ApiProperty } from '@nestjs/swagger';
import { Clase } from '../clase/clase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entrenadores')
export class Entrenador {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Laura' })
  @Column({ type: 'varchar', length: 80 })
  nombre!: string;

  @ApiProperty({ example: 'Martinez' })
  @Column({ type: 'varchar', length: 120 })
  apellidos!: string;

  @ApiProperty({ example: 'Crossfit' })
  @Column({ type: 'varchar', length: 100 })
  especialidad!: string;

  @ApiProperty({ example: 'laura@coach.com' })
  @Column({ type: 'varchar', length: 160, unique: true })
  email!: string;

  @ApiProperty({ example: '+34600999888' })
  @Column({ type: 'varchar', length: 20 })
  telefono!: string;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  // Un entrenador puede impartir varias clases.
  @OneToMany(() => Clase, (clase) => clase.entrenador)
  clases!: Clase[];
}
