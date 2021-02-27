import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import { MikroORM } from '@mikro-orm/core'

import Router from './routes'
import mikroOrmConfig from './mikro-orm.config'

const main = async () => {
  const app = express()
  const PORT: String = process.env.PORT || '3000'

  await MikroORM.init(mikroOrmConfig).then((_) => {
    console.log('DB Connected')
  })

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
