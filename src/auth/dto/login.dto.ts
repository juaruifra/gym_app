import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  // El email es el identificador único de login en este sistema.
  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'P@ssword123' })
  // Trim automático: evitamos problemas con espacios pegados al copiar/pegar.
  @Transform(({ value }) => (value as string).trim())
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password!: string;
}
