import { createConnection } from 'typeorm'

export default {
  type: 'postgres',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entities/*.[tj]s'],
  synchronize: false,
  migrationsTableName: 'migration_table',
  migrations: ['migration/*.[tj]s'],
  cli: {
    migrationsDir: './src/migration'
  }
} as Parameters<typeof createConnection>[0]
