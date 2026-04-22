import { ApiProperty } from '@nestjs/swagger';
import { RolUsuario } from '../common/enums/rol.enum';

export class UsuarioResponseDto {
  // Este DTO marca la salida pública (sin password).
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Juan' })
  nombre!: string;

  @ApiProperty({ example: 'Ruiz Perez' })
  apellidos!: string;

  @ApiProperty({ example: 'juan@email.com' })
  email!: string;

  @ApiProperty({ example: '+34600111222', required: false, nullable: true })
  telefono!: string | null;

  @ApiProperty({ enum: RolUsuario, example: RolUsuario.CLIENTE })
  rol!: RolUsuario;

  @ApiProperty({ example: '2026-04-22 12:00:00' })
  fechaRegistro!: string;
}
