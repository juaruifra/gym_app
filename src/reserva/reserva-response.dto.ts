import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from '../common/enums/estado-reserva.enum';

class ReservaUsuarioResumenDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Juan' })
  nombre!: string;

  @ApiProperty({ example: 'juan@email.com' })
  email!: string;
}

class ReservaClaseResumenDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Spinning Avanzado' })
  nombre!: string;

  @ApiProperty({ example: '2026-04-23' })
  fecha!: string;

  @ApiProperty({ example: '18:00:00' })
  horaInicio!: string;
}

export class ReservaResponseDto {
  // Formato final que devuelve la API para una reserva.
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '2026-04-22 12:00:00' })
  fechaReserva!: string;

  @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.ACTIVA })
  estado!: EstadoReserva;

  @ApiProperty({ example: 1 })
  usuarioId!: number;

  @ApiProperty({ example: 1 })
  claseId!: number;

  @ApiProperty({ type: ReservaUsuarioResumenDto, required: false, nullable: true })
  usuario?: ReservaUsuarioResumenDto;

  @ApiProperty({ type: ReservaClaseResumenDto, required: false, nullable: true })
  clase?: ReservaClaseResumenDto;
}
