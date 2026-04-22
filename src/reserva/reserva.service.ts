import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clase } from '../clase/clase.entity';
import { EstadoClase } from '../common/enums/estado-clase.enum';
import { EstadoReserva } from '../common/enums/estado-reserva.enum';
import { Usuario } from '../usuario/usuario.entity';
import { CreateReservaDto, UpdateReservaDto } from './reserva.dto';
import { Reserva } from './reserva.entity';
import { ReservaResponseDto } from './reserva-response.dto';
import { toSpainDateTime } from '../common/utils/datetime.util';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
  ) {}

  async create(createReservaDto: CreateReservaDto) {
    // Validamos que usuario y clase existan antes de reservar.
    const usuario = await this.usuarioRepository.findOne({
      where: { id: createReservaDto.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario ${createReservaDto.usuarioId} no encontrado`);
    }

    const clase = await this.claseRepository.findOne({
      where: { id: createReservaDto.claseId },
    });
    if (!clase) {
      throw new NotFoundException(`Clase ${createReservaDto.claseId} no encontrada`);
    }

    if (clase.estado !== EstadoClase.ACTIVA) {
      throw new BadRequestException('Solo se puede reservar una clase activa');
    }

    if (clase.plazasDisponibles <= 0) {
      throw new BadRequestException('No hay plazas disponibles para esta clase');
    }

    // Al reservar, consumimos una plaza.
    clase.plazasDisponibles -= 1;
    await this.claseRepository.save(clase);

    const reserva = this.reservaRepository.create({
      ...createReservaDto,
      estado: createReservaDto.estado ?? EstadoReserva.ACTIVA,
    });
    const saved = await this.reservaRepository.save(reserva);
    const withRelations = await this.reservaRepository.findOne({
      where: { id: saved.id },
      relations: ['usuario', 'clase'],
    });
    return this.toResponseDto(withRelations ?? saved);
  }

  async findAll() {
    const reservas = await this.reservaRepository.find({ relations: ['usuario', 'clase'] });
    return reservas.map((reserva) => this.toResponseDto(reserva));
  }

  async findOne(id: number) {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['usuario', 'clase'],
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva ${id} no encontrada`);
    }
    return this.toResponseDto(reserva);
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['usuario', 'clase'],
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva ${id} no encontrada`);
    }

    if (updateReservaDto.usuarioId) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: updateReservaDto.usuarioId } });
      if (!usuario) {
        throw new NotFoundException(`Usuario ${updateReservaDto.usuarioId} no encontrado`);
      }
    }

    if (updateReservaDto.claseId) {
      const clase = await this.claseRepository.findOne({ where: { id: updateReservaDto.claseId } });
      if (!clase) {
        throw new NotFoundException(`Clase ${updateReservaDto.claseId} no encontrada`);
      }
    }

    Object.assign(reserva, updateReservaDto);
    const saved = await this.reservaRepository.save(reserva);
    return this.toResponseDto(saved);
  }

  async remove(id: number) {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['usuario', 'clase'],
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva ${id} no encontrada`);
    }

    if (reserva.estado !== EstadoReserva.CANCELADA) {
      // Si la reserva estaba activa, devolvemos la plaza a la clase.
      const clase = await this.claseRepository.findOne({ where: { id: reserva.claseId } });
      if (clase && clase.plazasDisponibles < clase.aforoMaximo) {
        clase.plazasDisponibles += 1;
        await this.claseRepository.save(clase);
      }
    }

    await this.reservaRepository.remove(reserva);
    return { message: `Reserva ${id} eliminada` };
  }

  private toResponseDto(reserva: Reserva): ReservaResponseDto {
    // Incluimos resúmenes de usuario y clase para facilitar consumo en cliente.
    return {
      id: reserva.id,
      fechaReserva: toSpainDateTime(reserva.fechaReserva),
      estado: reserva.estado,
      usuarioId: reserva.usuarioId,
      claseId: reserva.claseId,
      usuario: reserva.usuario
        ? {
            id: reserva.usuario.id,
            nombre: reserva.usuario.nombre,
            email: reserva.usuario.email,
          }
        : undefined,
      clase: reserva.clase
        ? {
            id: reserva.clase.id,
            nombre: reserva.clase.nombre,
            fecha: reserva.clase.fecha,
            horaInicio: reserva.clase.horaInicio,
          }
        : undefined,
    };
  }
}
