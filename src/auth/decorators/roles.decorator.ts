import { SetMetadata } from '@nestjs/common';
import { RolUsuario } from '../../common/enums/rol.enum';

// Clave de metadatos que usará el RolesGuard para leer los roles requeridos.
export const ROLES_KEY = 'roles';

// Uso: @Roles(RolUsuario.ADMIN) encima de un método o controlador.
export const Roles = (...roles: RolUsuario[]) => SetMetadata(ROLES_KEY, roles);
