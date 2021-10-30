// import path from 'path'
// import express from 'express'
// import dotenv from 'dotenv'
// import colors from 'colors'
// import morgan from 'morgan'
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import connectDB from './config/db.js'
//
// import productRoutes from './routes/productRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'
// import uploadRoutes from './routes/uploadRoutes.js'
//
// dotenv.config()
//
// connectDB()
//
// const app = express()
//
// if (process.env.NODE_ENV === 'development') {
// 	app.use(morgan('dev'))
// }
//
// app.use(express.json())
//
// app.use('api/products', productRoutes)
// app.use('api/users', userRoutes)
// app.use('api/orders', orderRoutes)
// app.use('api/upload', uploadRoutes)
//
// // set up rate limiter: maximum of five requests per minute
// const RateLimit = require('express-rate-limit')
// const limiter = new RateLimit({
// 	windowMs: 1 * 60 * 1000, // 1 minute
// 	max: 5,
// })
//
// // apply rate limiter to all requests
// app.use(limiter)
// app.get('api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
//
// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
//
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '/frontend/build')))
// 	const express = require('express')
// 	const app = express()
//
// 	app.get('/:path', function (req, res) {
// 		let fs = require('fs'),
// 			http = require('http'),
// 			url = require('url')
//
// 		let server = http.createServer(function (req, res) {
// 			let path = url.parse(req.url, true).query.path
// 			app.get(
// 				'*',
// 				(req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
//
// 				app.get('/', (req, res) => {
// 					res.send('API is running....')
// 				}),
//
// 				app.use(notFound),
// 				app.use(errorHandler),
//
// 				app.listen(
// 					process.env.PORT || 80,
// 					console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
// 				),
// 			)
// 		})
// 	})
// }
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import rateLimit from 'express-rate-limit'
import escapeHTML from 'escape-html'
import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import uploadRoutes from './Routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.get('/user/:id', function (req, res) {
	if (!isValidUserId(req.params.id))
		// GOOD: request parameter is sanitized before incorporating it into the response
		res.send('Unknown user: ' + escapeHTML(req.params.id))
		// TODO: do something exciting
	else;
})

let limiter = new rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 0,
})

// apply rate limiter to all requests
app.use(limiter)

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products/', productRoutes)
app.use('/api/users/', userRoutes)
app.use('/api/orders/', orderRoutes)
app.use('/api/upload/', uploadRoutes)

app.get('/api/config/paypal/', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads/', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
	)
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
)
