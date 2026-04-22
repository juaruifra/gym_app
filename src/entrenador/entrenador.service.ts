import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntrenadorDto, UpdateEntrenadorDto } from './entrenador.dto';
import { Entrenador } from './entrenador.entity';
import { EntrenadorResponseDto } from './entrenador-response.dto';

@Injectable()
export class EntrenadorService {
  constructor(
    @InjectRepository(Entrenador)
    private readonly entrenadorRepository: Repository<Entrenador>,
  ) {}

  async create(createEntrenadorDto: CreateEntrenadorDto) {
    const existing = await this.entrenadorRepository.findOne({
      where: { email: createEntrenadorDto.email },
    });
    if (existing) {
      throw new ConflictException('Ya existe un entrenador con ese email');
    }

    const entrenador = this.entrenadorRepository.create(createEntrenadorDto);
    const saved = await this.entrenadorRepository.save(entrenador);
    return this.toResponseDto(saved);
  }

  async findAll() {
    const entrenadores = await this.entrenadorRepository.find();
    return entrenadores.map((entrenador) => this.toResponseDto(entrenador));
  }

  async findOne(id: number) {
    const entrenador = await this.entrenadorRepository.findOne({ where: { id } });
    if (!entrenador) {
      throw new NotFoundException(`Entrenador ${id} no encontrado`);
    }
    return this.toResponseDto(entrenador);
  }

  async update(id: number, updateEntrenadorDto: UpdateEntrenadorDto) {
    const entrenador = await this.entrenadorRepository.findOne({ where: { id } });
    if (!entrenador) {
      throw new NotFoundException(`Entrenador ${id} no encontrado`);
    }

    if (updateEntrenadorDto.email && updateEntrenadorDto.email !== entrenador.email) {
      const existing = await this.entrenadorRepository.findOne({
        where: { email: updateEntrenadorDto.email },
      });
      if (existing) {
        throw new ConflictException('Ya existe un entrenador con ese email');
      }
    }

    Object.assign(entrenador, updateEntrenadorDto);
    const saved = await this.entrenadorRepository.save(entrenador);
    return this.toResponseDto(saved);
  }

  async remove(id: number) {
    const entrenador = await this.entrenadorRepository.findOne({ where: { id } });
    if (!entrenador) {
      throw new NotFoundException(`Entrenador ${id} no encontrado`);
    }
    await this.entrenadorRepository.remove(entrenador);
    return { message: `Entrenador ${id} eliminado` };
  }

  private toResponseDto(entrenador: Entrenador): EntrenadorResponseDto {
    return {
      id: entrenador.id,
      nombre: entrenador.nombre,
      apellidos: entrenador.apellidos,
      especialidad: entrenador.especialidad,
      email: entrenador.email,
      telefono: entrenador.telefono,
      activo: entrenador.activo,
    };
  }
}
