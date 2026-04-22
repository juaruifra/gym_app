import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClaseDto, UpdateClaseDto } from './clase.dto';
import { Clase } from './clase.entity';
import { ClaseResponseDto } from './clase-response.dto';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
  ) {}

  async create(createClaseDto: CreateClaseDto) {
    this.validateTimeRange(createClaseDto.horaInicio, createClaseDto.horaFin);

    const dto = { ...createClaseDto };
    if (dto.plazasDisponibles === undefined) {
      dto.plazasDisponibles = dto.aforoMaximo;
    }
    if (dto.plazasDisponibles > dto.aforoMaximo) {
      throw new BadRequestException('plazasDisponibles no puede ser mayor que aforoMaximo');
    }

    const clase = this.claseRepository.create(dto);
    const saved = await this.claseRepository.save(clase);
    const withRelations = await this.claseRepository.findOne({
      where: { id: saved.id },
      relations: ['entrenador'],
    });
    return this.toResponseDto(withRelations ?? saved);
  }

  async findAll() {
    const clases = await this.claseRepository.find({ relations: ['entrenador'] });
    return clases.map((clase) => this.toResponseDto(clase));
  }

  async findOne(id: number) {
    const clase = await this.claseRepository.findOne({
      where: { id },
      relations: ['entrenador', 'reservas'],
    });
    if (!clase) {
      throw new NotFoundException(`Clase ${id} no encontrada`);
    }
    return this.toResponseDto(clase);
  }

  async update(id: number, updateClaseDto: UpdateClaseDto) {
    const clase = await this.claseRepository.findOne({
      where: { id },
      relations: ['entrenador', 'reservas'],
    });
    if (!clase) {
      throw new NotFoundException(`Clase ${id} no encontrada`);
    }

    const horaInicio = updateClaseDto.horaInicio ?? clase.horaInicio;
    const horaFin = updateClaseDto.horaFin ?? clase.horaFin;
    this.validateTimeRange(horaInicio, horaFin);

    const aforoMaximo = updateClaseDto.aforoMaximo ?? clase.aforoMaximo;
    const plazasDisponibles = updateClaseDto.plazasDisponibles ?? clase.plazasDisponibles;
    if (plazasDisponibles > aforoMaximo) {
      throw new BadRequestException('plazasDisponibles no puede ser mayor que aforoMaximo');
    }

    Object.assign(clase, updateClaseDto);
    const saved = await this.claseRepository.save(clase);
    return this.toResponseDto(saved);
  }

  async remove(id: number) {
    const clase = await this.claseRepository.findOne({ where: { id } });
    if (!clase) {
      throw new NotFoundException(`Clase ${id} no encontrada`);
    }
    await this.claseRepository.remove(clase);
    return { message: `Clase ${id} eliminada` };
  }

  private validateTimeRange(horaInicio: string, horaFin: string) {
    if (horaFin <= horaInicio) {
      throw new BadRequestException('horaFin debe ser posterior a horaInicio');
    }
  }

  private toResponseDto(clase: Clase): ClaseResponseDto {
    return {
      id: clase.id,
      nombre: clase.nombre,
      descripcion: clase.descripcion,
      fecha: clase.fecha,
      horaInicio: clase.horaInicio,
      horaFin: clase.horaFin,
      aforoMaximo: clase.aforoMaximo,
      plazasDisponibles: clase.plazasDisponibles,
      estado: clase.estado,
      entrenadorId: clase.entrenadorId,
      entrenador: clase.entrenador
        ? {
            id: clase.entrenador.id,
            nombre: clase.entrenador.nombre,
            apellidos: clase.entrenador.apellidos,
          }
        : undefined,
    };
  }
}
