const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})

// require('dotenv').config()

// const express = require('express')
// const app = express()
// app.use(express.static('build'))
// app.use(express.json())

// const Note = require('./models/note')

// const cors = require('cors')
// app.use(cors())

// const requestLogger = (request, response, next) => {
// 	console.log('---start---')
// 	console.log('Method:', request.method)
// 	console.log('Path:  ', request.path)
// 	console.log('Body:  ', request.body)
// 	console.log('---end---')
// 	next()
// }
// app.use(requestLogger)

// const morgan = require('morgan')
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


// app.get('/', (request, response) => {
// 	response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
// 	Note.find({})
// 		.then(notes => {
// 			response.json(notes)
// 		})
// })

// app.get('/api/notes/:id', (request, response, next) => {
// 	Note.findById(request.params.id)
// 		.then(note => {
// 			if (note) {
// 				response.json(note)
// 			} else {
// 				response.status(404).end()
// 			}
// 		})
// 		.catch(error => next(error))
// })

// app.put('/api/notes/:id', (request, response, next) => {
// 	const { content, important } = request.body

// 	Note.findByIdAndUpdate(request.params.id, { content, important }, { new:true, runValidators:true, context:'query' })
// 		.then(updatedNote => {
// 			response.json(updatedNote)
// 		})
// 		.catch(error => next(error))
// })

// app.delete('/api/notes/:id', (request, response, next) => {
// 	Note.findByIdAndRemove(request.params.id)
// 		.then(() => {
// 			response.status(204).end()
// 		})
// 		.catch(error => next(error))
// })

// app.post('/api/notes', (request, response, next) => {
// 	const body = request.body
// 	const note = new Note({
// 		content: body.content,
// 		important: body.important || false
// 	})

// 	note.save()
// 		.then(savedNote => {
// 			response.json(savedNote)
// 		})
// 		.catch(error => next(error))
// })

// const unknownEndpoint = (request, response) => {
// 	response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
// 	console.error(error.message)
// 	if (error.name === 'CastError') {
// 		return response.status(400).send({ error: 'malformatted id' })
// 	} else if (error.name === 'ValidationError') {
// 		return response.status(400).json({ error: error.message })
// 	}
// 	next(error)
// }
// // this has to be the last loaded middleware.
// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`)
// })