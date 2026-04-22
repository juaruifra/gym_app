import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import reservaData from '../../../data/reserva';
import { Reserva } from '../../../reserva/reserva.entity';

export class ReservaSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Reserva);

    // Idempotente por id: útil para repetir pruebas.
    await repository.upsert(reservaData, ['id']);
    console.log('Seeding de reservas completado');
  }
}
