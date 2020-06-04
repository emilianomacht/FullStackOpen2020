const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('../utils/blog_api_test_helper')

jest.setTimeout(10000)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test.only('unique identifier is named id', async () => {
  const blogsInDb = await helper.blogsInDb()
  // console.log('blogsInDb', blogsInDb)
  expect(blogsInDb[0].id).toBeDefined()
})

test('HTTP POST succesfully creates blog post', async () => {
  const testPost = {
    title: 'HTTP POST succesfully creates blog post',
    author: 'String',
    url: 'String',
    likes: 7357
  }

  await api.post('/api/blogs')
    .send(testPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()

  expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)
  const titles = blogsInDb.map(blog => blog.title)
  expect(titles).toContain('HTTP POST succesfully creates blog post')
})


afterAll(() => {
  mongoose.connection.close()
})