import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { EstadoReserva } from '../common/enums/estado-reserva.enum';

export class CreateReservaDto {
  // Relación con el usuario que hace la reserva.
  @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId!: number;

  // Relación con la clase reservada.
  @ApiProperty({ example: 1 })
  @IsInt()
  claseId!: number;

  @ApiProperty({ enum: EstadoReserva, required: false, example: EstadoReserva.ACTIVA })
  @IsOptional()
  @IsEnum(EstadoReserva)
  estado?: EstadoReserva;
}

export class UpdateReservaDto extends PartialType(CreateReservaDto) {}
