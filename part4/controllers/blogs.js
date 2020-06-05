const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(result)
})

blogsRouter.post('/', async (request, response, next) => {

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!(request.token) || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    console.log('user', user)
    const blog = new Blog({
      ...request.body,
      user: user._id
    })

    const result = await blog.save()
    console.log('user before', user)
    user.blogs = user.blogs.concat(result._id)
    console.log('user after', user)
    user.save()
    response.status(201).json(result)
  } catch (error) {
    // response.status(400).end()
    next(error)
  }

})

blogsRouter.delete('/:id', async (request, response) => {
  const idToDelete = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!(request.token) || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(idToDelete)
    // console.log('user', user)
    // console.log('blog', blog.user.toString())
    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(idToDelete)
      response.status(204).end()
    } else {
      return response.status(404).end()
    }
  } catch (error) {
    response.status(400).end()
  }

})

blogsRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const idToUpdate = request.params.id
  const blogPostToUpdate = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    await Blog.findByIdAndUpdate(idToUpdate, blogPostToUpdate)
    const updatedBlogPost = await Blog.findById(idToUpdate)
    response.status(200).json(updatedBlogPost)
  } catch (error) {
    response.status(400).end()
  }
})

module.exports = blogsRouter