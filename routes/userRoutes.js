import express from 'express'
const Router = express.Router()
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

Router.route('/').post(registerUser).get(protect, admin, getUsers)
Router.post('/login', authUser)
Router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
Router.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)
export default Router
