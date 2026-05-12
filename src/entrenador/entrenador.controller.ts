import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { RolUsuario } from '../common/enums/rol.enum';
import { CreateEntrenadorDto, UpdateEntrenadorDto } from './entrenador.dto';
import { EntrenadorService } from './entrenador.service';

@ApiTags('entrenadores')
@Controller('entrenadores')
export class EntrenadorController {
  constructor(private readonly entrenadorService: EntrenadorService) {}

  @Post()
  @Roles(RolUsuario.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Crear entrenador (ADMIN)' })
  @ApiResponse({ status: 201, description: 'Entrenador creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  create(@Body() createEntrenadorDto: CreateEntrenadorDto) {
    return this.entrenadorService.create(createEntrenadorDto);
  }

  // La lista de entrenadores es pública para que los clientes sepan con quién trabajan.
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar entrenadores (público)' })
  @ApiResponse({ status: 200, description: 'Lista de entrenadores' })
  findAll() {
    return this.entrenadorService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener entrenador por ID (público)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Entrenador encontrado' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  // Validamos el parámetro en el controlador para simplificar el servicio.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadorService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Actualizar entrenador (ADMIN)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Entrenador actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntrenadorDto: UpdateEntrenadorDto,
  ) {
    return this.entrenadorService.update(id, updateEntrenadorDto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Eliminar entrenador (ADMIN)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Entrenador eliminado' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  @ApiResponse({ status: 404, description: 'Entrenador no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadorService.remove(id);
  }
}
