import dotenv from 'dotenv'
dotenv.config()
import { MikroORMOptions } from '@mikro-orm/core'
import { __prod__ } from './constants'
import path from 'path'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/
  },
  entities: ['./dist/app/**/entities'],
  entitiesTs: [path.join(__dirname, './entities/**/*.ts')],
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  type: process.env.DB_TYPE,
  debug: !__prod__
} as MikroORMOptions
