import express, { Router } from 'express'
import UserController from '../controllers/User'
const User: Router = express.Router()

User.post('/create', UserController.create)
User.get('/:username', UserController.getUser)
User.post('/login', UserController.login)

export default User
