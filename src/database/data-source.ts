import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/test.db',
  synchronize: true,
  logging: false,
  entities: ['src/database/entities/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
});
