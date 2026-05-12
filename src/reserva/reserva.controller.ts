import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolUsuario } from '../common/enums/rol.enum';
import type { JwtPayload } from '../auth/interface/jwt-payload.interface';
import { CreateReservaDto, UpdateReservaDto } from './reserva.dto';
import { ReservaService } from './reserva.service';

@ApiTags('reservas')
@ApiBearerAuth('access-token')
@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  // El cliente hace su propia reserva; el usuarioId se fuerza desde el token en el servicio.
  @Post()
  @Roles(RolUsuario.CLIENTE)
  @ApiOperation({ summary: 'Crear reserva (CLIENTE)' })
  @ApiResponse({ status: 201, description: 'Reserva creada' })
  @ApiResponse({ status: 400, description: 'Sin plazas o clase no activa' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere CLIENTE)' })
  @ApiResponse({ status: 404, description: 'Usuario o clase no encontrados' })
  create(@Body() createReservaDto: CreateReservaDto, @CurrentUser() user: JwtPayload) {
    return this.reservaService.create(createReservaDto, user.sub);
  }

  // Solo el admin puede ver todas las reservas del sistema.
  @Get()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Listar todas las reservas (ADMIN)' })
  @ApiResponse({ status: 200, description: 'Lista de reservas' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener reserva por ID (ADMIN)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Reserva encontrada' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  // El id se valida aquí para evitar errores aguas abajo.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Actualizar reserva (ADMIN)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Reserva actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(id, updateReservaDto);
  }

  // El cliente puede cancelar su propia reserva; el servicio verifica que le pertenece.
  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar/eliminar reserva (CLIENTE propia o ADMIN cualquiera)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Reserva eliminada' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: JwtPayload) {
    return this.reservaService.remove(id, user);
  }
}
