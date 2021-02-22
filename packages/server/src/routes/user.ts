import express, { Router } from 'express'
import UserController from '../controllers/User'
const User: Router = express.Router()

User.post('/create', UserController.create)
User.get('/get-user', UserController.getUser)

export default User
