import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { EstadoReserva } from '../common/enums/estado-reserva.enum';

export class CreateReservaDto {
  // El usuarioId lo inyecta el servicio desde el token JWT; no debe enviarlo el cliente.
  // Se mantiene en el DTO para que TypeORM pueda asignarlo internamente.
  @IsOptional()
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
