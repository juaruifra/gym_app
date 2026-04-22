import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { EstadoClase } from '../common/enums/estado-clase.enum';

export class CreateClaseDto {
  // Fecha y horas se validan para mantener coherencia del horario.
  @ApiProperty({ example: 'Spinning Avanzado' })
  @IsString()
  @MaxLength(120)
  nombre!: string;

  @ApiProperty({ example: 'Clase de alta intensidad de 45 minutos', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: '2026-04-23' })
  @IsDateString()
  fecha!: string;

  @ApiProperty({ example: '18:00:00' })
  @IsString()
  horaInicio!: string;

  @ApiProperty({ example: '18:45:00' })
  @IsString()
  horaFin!: string;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(1)
  aforoMaximo!: number;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  plazasDisponibles?: number;

  @ApiProperty({ enum: EstadoClase, required: false, example: EstadoClase.ACTIVA })
  @IsOptional()
  @IsEnum(EstadoClase)
  estado?: EstadoClase;

  // Referencia al entrenador que imparte esta clase.
  @ApiProperty({ example: 1 })
  @IsInt()
  entrenadorId!: number;
}

export class UpdateClaseDto extends PartialType(CreateClaseDto) {}
