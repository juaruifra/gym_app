import { RolUsuario } from '../../common/enums/rol.enum';

// Tipado del payload que firmamos en el JWT.
// Se adjunta al request tras verificarlo en JwtAuthGuard.
export interface JwtPayload {
  sub: number;      // ID del usuario (estándar JWT: subject)
  email: string;
  rol: RolUsuario;
}
