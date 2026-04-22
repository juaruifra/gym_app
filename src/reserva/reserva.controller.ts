import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateReservaDto, UpdateReservaDto } from './reserva.dto';
import { ReservaService } from './reserva.service';

@ApiTags('reservas')
@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear reserva' })
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar reservas' })
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener reserva por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar reserva' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(id, updateReservaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar reserva' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.remove(id);
  }
}
