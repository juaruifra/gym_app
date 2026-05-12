import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

// RegisterDto es el equivalente a CreateUsuarioDto pero para el flujo público de registro.
// El rol no se expone aquí: el registro siempre crea un CLIENTE.
export class RegisterDto {
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
  @Transform(({ value }) => (value as string).trim())
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password!: string;

  @ApiProperty({ example: '+34600111222', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;
}
