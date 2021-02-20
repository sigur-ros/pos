import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

const app = express()
const PORT = process.env.PORT

app.get('/', (_req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`)
})
