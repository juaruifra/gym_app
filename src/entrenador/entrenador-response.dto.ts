import { ApiProperty } from '@nestjs/swagger';

export class EntrenadorResponseDto {
  // Contrato de salida para listar y consultar entrenadores.
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Laura' })
  nombre!: string;

  @ApiProperty({ example: 'Martinez' })
  apellidos!: string;

  @ApiProperty({ example: 'Crossfit' })
  especialidad!: string;

  @ApiProperty({ example: 'laura@coach.com' })
  email!: string;

  @ApiProperty({ example: '+34600999888' })
  telefono!: string;

  @ApiProperty({ example: true })
  activo!: boolean;
}
