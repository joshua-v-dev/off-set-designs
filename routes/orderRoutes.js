import express from 'express'
const Router = express.Router()
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

Router.route('/').post(protect, addOrderItems).get(protect, admin, getMyOrders)
Router.route('/myorders').get(protect, getMyOrders)
Router.route('/:id').get(protect, getOrderById)
Router.route('/:id/pay').put(protect, updateOrderToPaid)
Router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default Router
