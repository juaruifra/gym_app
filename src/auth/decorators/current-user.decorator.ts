import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';

// Extrae el payload del usuario autenticado directamente en los parámetros del método.
// Uso: @CurrentUser() user: JwtPayload
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    return request.user;
  },
);
