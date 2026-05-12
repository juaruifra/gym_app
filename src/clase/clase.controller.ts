import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { RolUsuario } from '../common/enums/rol.enum';
import { ClaseService } from './clase.service';
import { CreateClaseDto, UpdateClaseDto } from './clase.dto';

@ApiTags('clases')
@Controller('clases')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  // Solo el admin puede crear clases.
  @Post()
  @Roles(RolUsuario.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Crear clase (ADMIN)' })
  @ApiResponse({ status: 201, description: 'Clase creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  create(@Body() createClaseDto: CreateClaseDto) {
    return this.claseService.create(createClaseDto);
  }

  // Consultar clases es público: cualquier visitante puede ver la oferta del gimnasio.
  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar clases (público)' })
  @ApiResponse({ status: 200, description: 'Lista de clases' })
  findAll() {
    return this.claseService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener clase por ID (público)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Clase encontrada' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  // Parseamos el id aquí para que el servicio reciba ya un número.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.claseService.findOne(id);
  }

  @Patch(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Actualizar clase (ADMIN)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Clase actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClaseDto: UpdateClaseDto) {
    return this.claseService.update(id, updateClaseDto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Eliminar clase (ADMIN)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Clase eliminada' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  @ApiResponse({ status: 403, description: 'Sin permiso (requiere ADMIN)' })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.claseService.remove(id);
  }
}
