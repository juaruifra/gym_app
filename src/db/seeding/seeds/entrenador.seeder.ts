import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import entrenadorData from '../../../data/entrenador';
import { Entrenador } from '../../../entrenador/entrenador.entity';

export class EntrenadorSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Entrenador);

    // Se actualiza por email para mantener idempotencia.
    await repository.upsert(entrenadorData, ['email']);
    console.log('Seeding de entrenadores completado');
  }
}
