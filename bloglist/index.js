require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose.connect(mongoUrl)

const cors = require('cors')
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
	console.log('---start---')
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---end---')
	next()
}
app.use(requestLogger)

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		minLength: 6,
		required: true
	},
	author: {
		type: String,
		minLength: 3,
		required: true
	},
	url: {
		type: String,
		minLength: 9,
		required: true
	},
	likes: Number
})
blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
const Blog = mongoose.model('Blog', blogSchema)

// app.get('/', (request, response) => {
// 	response.send('<h1>Hello World!</h1>')
// })

app.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

app.get('/api/blogs/:id', (request, response, next) => {
	Blog.findById(request.params.id)
		.then(blog => {
			if (blog) {
				response.json(blog)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.post('/api/blogs', (request, response, next) => {
	const blog = new Blog(request.body)
	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => next(error))
})

/ app.put('/api/blogs/:id', (request, response, next) => {
	const { title, author, url, likes } = request.body
	Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new:true, runValidators:true, context:'query' })
		.then(updatedBlog => {
			response.json(updatedBlog)
		})
		.catch(error => next(error))
})

app.delete('/api/blogs/:id', (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}
// this has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})