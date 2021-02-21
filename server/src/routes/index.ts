import express from 'express'
import User from './user'
const Router = express.Router()

Router.use('/users', User)

export default Router

