import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { AsyncLocalStorage } from 'async_hooks'
import { EntityManager, MikroORM } from '@mikro-orm/core'

import Router from './routes'
import mikroOrmConfig from './mikro-orm.config'
import { __prod__ } from './constants'

/**
 * Dependency injection
 * refs: https://github.com/mikro-orm/express-ts-example-app/blob/e875544b9f6d1ba822c37be82ab0d90564f8e0e3/app/server.ts#L8-L22
 */
export const DI = {} as {
  orm: MikroORM
  em: EntityManager
}

const main = async () => {
  const app = express()
  const PORT: String = process.env.PORT || '3000'

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()

  /**
   * refs:
   * https://mikro-orm.io/docs/identity-map#why-is-request-context-needed
   * https://www.freecodecamp.org/news/async-local-storage-nodejs/
   * https://mikro-orm.io/docs/async-local-storage/
   */
  const storage = new AsyncLocalStorage<EntityManager>()

  DI.orm = await MikroORM.init({
    ...mikroOrmConfig,
    context: () => storage.getStore()
  })
  DI.em = DI.orm.em

  app.use((_req, _res, next) => {
    storage.run(DI.em.fork(true, true), next)
  })

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTTL: false,
        disableTouch: false
      }),
      cookie: {
        httpOnly: true,
        secure: __prod__,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years (in ms)
        sameSite: 'lax' // csrf
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'bae suzy',
      resave: false
    })
  )

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(morgan('dev'))

  app.use('/', Router)

  app.listen(PORT, () => {
    console.log(`Server runs on port: ${PORT}`)
  })
}

main().catch((err) => {
  console.error(err)
})
