import express from 'express'
const Router = express.Router()
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

Router.route('/').get(getProducts).post(protect, admin, createProduct)
Router.route('/:id/reviews').post(protect, createProductReview)
Router.get('/top', getTopProducts)
Router.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

export default Router
