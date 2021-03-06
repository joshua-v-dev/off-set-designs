import path from 'path'
import express from 'express'
import multer from 'multer'
import escapeHTML from 'escape-html'

const Router = express.Router()

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
	},
})

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only!')
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})

Router.post('/', upload.single('image'), (req, res) => {
	res.send(escapeHTML(`/${req.file.path}`))
	const http = req.params.path
	const server = http.createServer
	app.get(server, function (req, res) {
		let path = url.parse(req.url, true).query.path

		if (isValidPath(path)) res.sendFile(path)
	})
})

export default Router
