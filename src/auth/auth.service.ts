import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RolUsuario } from '../common/enums/rol.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  // --- LOGIN ---
  async login(loginDto: LoginDto) {
    // Buscamos al usuario por email. Si no existe, devolvemos el mismo error
    // que si la contraseña fuera incorrecta (no damos pistas al atacante).
    const usuario = await this.usuarioService.findOneByEmail(loginDto.email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, usuario.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // El payload lleva el id, email y rol para que los guards puedan trabajar sin ir a BD.
    const payload: JwtPayload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }

  // --- REGISTER ---
  async register(registerDto: RegisterDto) {
    // Comprobamos si el email ya está en uso antes de intentar crear.
    const existe = await this.usuarioService.findOneByEmail(registerDto.email);
    if (existe) {
      throw new BadRequestException(`Ya existe un usuario con el email ${registerDto.email}`);
    }

    // El registro público siempre asigna rol CLIENTE. Solo un admin puede crear admins.
    await this.usuarioService.create({
      ...registerDto,
      rol: RolUsuario.CLIENTE,
    });

    return { message: 'Usuario registrado correctamente' };
  }
}
