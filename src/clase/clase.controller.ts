import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaseService } from './clase.service';
import { CreateClaseDto, UpdateClaseDto } from './clase.dto';

@ApiTags('clases')
@Controller('clases')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  @ApiOperation({ summary: 'Crear clase' })
  create(@Body() createClaseDto: CreateClaseDto) {
    return this.claseService.create(createClaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar clases' })
  findAll() {
    return this.claseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener clase por ID' })
  @ApiParam({ name: 'id', type: Number })
  // Parseamos el id aquí para que el servicio reciba ya un número.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.claseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar clase' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClaseDto: UpdateClaseDto) {
    return this.claseService.update(id, updateClaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar clase' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.claseService.remove(id);
  }
}
