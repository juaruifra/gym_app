import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolUsuario } from '../../common/enums/rol.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Leemos los roles requeridos del decorador @Roles(), si no hay ninguno, permitimos.
    const requiredRoles = this.reflector.getAllAndOverride<RolUsuario[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest<{ user?: JwtPayload }>();
    const userRole = request.user?.rol;

    // Si el rol del usuario no está en la lista de roles permitidos, devolvemos 403.
    if (!userRole || !requiredRoles.includes(userRole)) {
      throw new ForbiddenException('No tienes permiso para realizar esta acción');
    }

    return true;
  }
}
