import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import ormconfig from './ormconfig'

import Router from './routes'

const main = async () => {
  const app = express()
  const PORT: String = process.env.PORT || '3000'

  await createConnection(ormconfig).then((_) => {
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
