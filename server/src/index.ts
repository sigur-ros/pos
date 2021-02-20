import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectDB } from './database'
import Router from './routes/index'
import morgan from 'morgan'

const app = express()
const PORT: String = process.env.PORT!

connectDB().then(_ => console.log('db connected')).catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/', Router)

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`)
})
