import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectDB } from './config/database'
import Router from './routes/index'
import morgan from 'morgan'

const app = express()
const PORT: String = process.env.PORT || '3000'

connectDB()
  .then((_) => console.log('DB Connected'))
  .catch((err) => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/', Router)

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`)
})
