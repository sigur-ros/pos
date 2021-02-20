import dotenv from 'dotenv'
dotenv.config()
import { createConnection } from 'typeorm';

export const connectDB = async () => {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST!,
    port: 5432,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    entities: [
      __dirname + "/entities/*.js"
    ],
    synchronize: false,
    migrationsTableName: "migration_table",
    migrations: ["migration/*.ts"],
    cli: {
      "migrationsDir": "./src/migration"
    }
  });
};