import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioResponseDto } from './usuario-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const existing = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });
    if (existing) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    const password = await bcrypt.hash(createUsuarioDto.password, 10);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password,
    });

    const savedUsuario = await this.usuarioRepository.save(usuario);
    return this.toResponseDto(savedUsuario);
  }

  findAll() {
    return this.usuarioRepository.find().then((usuarios) => usuarios.map((usuario) => this.toResponseDto(usuario)));
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    return this.toResponseDto(usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const entity = await this.usuarioRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }

    if (updateUsuarioDto.email && updateUsuarioDto.email !== entity.email) {
      const existing = await this.usuarioRepository.findOne({
        where: { email: updateUsuarioDto.email },
      });
      if (existing) {
        throw new ConflictException('Ya existe un usuario con ese email');
      }
    }

    if (updateUsuarioDto.password) {
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, 10);
    }

    Object.assign(entity, updateUsuarioDto);
    return this.usuarioRepository.save(entity).then((savedUsuario) => this.toResponseDto(savedUsuario));
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    await this.usuarioRepository.remove(usuario);
    return { message: `Usuario ${id} eliminado` };
  }

  private toResponseDto(usuario: Usuario): UsuarioResponseDto {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      telefono: usuario.telefono,
      rol: usuario.rol,
      fechaRegistro: usuario.fechaRegistro,
    };
  }
}
