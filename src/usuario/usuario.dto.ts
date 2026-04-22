import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { RolUsuario } from '../common/enums/rol.enum';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  nombre!: string;

  @ApiProperty({ example: 'Ruiz Perez' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  apellidos!: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'P@ssword123' })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password!: string;

  @ApiProperty({ example: '+34600111222', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiProperty({ enum: RolUsuario, required: false, example: RolUsuario.CLIENTE })
  @IsOptional()
  @IsEnum(RolUsuario)
  rol?: RolUsuario;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
