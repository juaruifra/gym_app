import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { JwtPayload } from './interface/jwt-payload.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registro público: cualquiera puede crear una cuenta de tipo CLIENTE.
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario (rol CLIENTE)' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o email ya registrado' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Login devuelve 200, no 201, porque no estamos creando un recurso nuevo.
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión y obtener JWT' })
  @ApiResponse({ status: 200, description: 'Login correcto. Devuelve access_token' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Ruta de prueba para verificar que el token funciona: requiere JWT válido.
  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Devuelve el perfil del usuario autenticado (del token)' })
  @ApiResponse({ status: 200, description: 'Payload del token' })
  @ApiResponse({ status: 401, description: 'Token ausente o inválido' })
  me(@CurrentUser() user: JwtPayload) {
    return user;
  }
}
