import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { Clase } from './clase/clase.entity';
import { Entrenador } from './entrenador/entrenador.entity';
import { Reserva } from './reserva/reserva.entity';
import { Usuario } from './usuario/usuario.entity';
import { ClaseSeeder } from './db/seeding/seeds/clase.seeder';
import { EntrenadorSeeder } from './db/seeding/seeds/entrenador.seeder';
import { ReservaSeeder } from './db/seeding/seeds/reserva.seeder';
import { UsuarioSeeder } from './db/seeding/seeds/usuario.seeder';

config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Usuario, Entrenador, Clase, Reserva],
  seeds: [EntrenadorSeeder, UsuarioSeeder, ClaseSeeder, ReservaSeeder],
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize();
    await runSeeders(dataSource);
    await dataSource.destroy();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Error inicializando la fuente de datos', error);
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    process.exit(1);
  });
