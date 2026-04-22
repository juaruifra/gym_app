import { ApiProperty } from '@nestjs/swagger';
import { EstadoClase } from '../common/enums/estado-clase.enum';

class ClaseEntrenadorResumenDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Laura' })
  nombre!: string;

  @ApiProperty({ example: 'Martinez' })
  apellidos!: string;
}

export class ClaseResponseDto {
  // DTO que devuelve los datos de la clase ya listos para frontend.
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Spinning Avanzado' })
  nombre!: string;

  @ApiProperty({ example: 'Clase de alta intensidad de 45 minutos', nullable: true })
  descripcion!: string | null;

  @ApiProperty({ example: '2026-04-23' })
  fecha!: string;

  @ApiProperty({ example: '18:00:00' })
  horaInicio!: string;

  @ApiProperty({ example: '18:45:00' })
  horaFin!: string;

  @ApiProperty({ example: 20 })
  aforoMaximo!: number;

  @ApiProperty({ example: 20 })
  plazasDisponibles!: number;

  @ApiProperty({ enum: EstadoClase, example: EstadoClase.ACTIVA })
  estado!: EstadoClase;

  @ApiProperty({ example: 1 })
  entrenadorId!: number;

  @ApiProperty({ type: ClaseEntrenadorResumenDto, required: false, nullable: true })
  entrenador?: ClaseEntrenadorResumenDto;
}
