import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Reserva } from '../reserva/reserva.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolUsuario } from '../common/enums/rol.enum';

@Entity('usuarios')
export class Usuario {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Juan' })
  @Column({ type: 'varchar', length: 80 })
  nombre!: string;

  @ApiProperty({ example: 'Ruiz Perez' })
  @Column({ type: 'varchar', length: 120 })
  apellidos!: string;

  @ApiProperty({ example: 'juan@email.com' })
  @Column({ type: 'varchar', length: 160, unique: true })
  email!: string;

  @ApiProperty({ example: 'P@ssword123' })
  // Exclude evita que la contraseña salga en serializaciones por error.
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @ApiProperty({ example: '+34600111222', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono!: string | null;

  @ApiProperty({ enum: RolUsuario, example: RolUsuario.CLIENTE })
  @Column({ type: 'enum', enum: RolUsuario, default: RolUsuario.CLIENTE })
  rol!: RolUsuario;

  @ApiProperty({ example: '2026-04-22T10:00:00.000Z' })
  @CreateDateColumn({ name: 'fecha_registro' })
  fechaRegistro!: Date;

  // Un usuario puede tener muchas reservas.
  @OneToMany(() => Reserva, (reserva) => reserva.usuario)
  reservas!: Reserva[];
}
