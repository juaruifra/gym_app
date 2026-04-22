import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEntrenadorDto {
  @ApiProperty({ example: 'Laura' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  nombre!: string;

  @ApiProperty({ example: 'Martinez' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  apellidos!: string;

  @ApiProperty({ example: 'Crossfit' })
  @IsString()
  @MaxLength(100)
  especialidad!: string;

  @ApiProperty({ example: 'laura@coach.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+34600999888' })
  @IsString()
  @MaxLength(20)
  telefono!: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateEntrenadorDto extends PartialType(CreateEntrenadorDto) {}
