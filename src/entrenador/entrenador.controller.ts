import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateEntrenadorDto, UpdateEntrenadorDto } from './entrenador.dto';
import { EntrenadorService } from './entrenador.service';

@ApiTags('entrenadores')
@Controller('entrenadores')
export class EntrenadorController {
  constructor(private readonly entrenadorService: EntrenadorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear entrenador' })
  create(@Body() createEntrenadorDto: CreateEntrenadorDto) {
    return this.entrenadorService.create(createEntrenadorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar entrenadores' })
  findAll() {
    return this.entrenadorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener entrenador por ID' })
  @ApiParam({ name: 'id', type: Number })
  // Validamos el parámetro en el controlador para simplificar el servicio.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar entrenador' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntrenadorDto: UpdateEntrenadorDto,
  ) {
    return this.entrenadorService.update(id, updateEntrenadorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar entrenador' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadorService.remove(id);
  }
}
