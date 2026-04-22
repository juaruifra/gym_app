import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import claseData from '../../../data/clase';
import { Clase } from '../../../clase/clase.entity';

export class ClaseSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Clase);

    await repository.upsert(claseData, ['id']);
    console.log('Seeding de clases completado');
  }
}
