import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
import usuarioData from '../../../data/usuario';
import { Usuario } from '../../../usuario/usuario.entity';

export class UsuarioSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Usuario);

    const rows = await Promise.all(
      usuarioData.map(async (item) => ({
        ...item,
        password: await bcrypt.hash(item.password, 10),
      })),
    );

    await repository.upsert(rows, ['email']);
    console.log('Seeding de usuarios completado');
  }
}
