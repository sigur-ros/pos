// {
//   "type": "postgres",
//   "host": "localhost",
//   "port": 5432,
//   "username": "postgres",
//   "password": "postgres",
//   "database": "pos",
//   "synchronize": false,
//   "logging": false,
//   "entities": [
//     "src/entities/**/*.ts"
//   ],
//   "migrations": [
//     "src/migration/**/*.ts"
//   ],
//   "subscribers": [
//     "src/subscriber/**/*.ts"
//   ],
//   "migrationsTableName": "migration_table",
//   "cli": {
//     "migrationsDir": "./src/migration"
//   }
// }
export = {
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
}