const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('../utils/tests_helper')

jest.setTimeout(20000)

let dummyToken = ''

beforeAll(async () => {
  const dummyUser = {
    'username': 'dummy',
    'password': 'pswd'
  }
  await api
    .post('/api/users')
    .send(dummyUser)

  const respLogin = await api
    .post('/api/login')
    .send(dummyUser)

  dummyToken = respLogin.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
describe('blogs saved initially', () => {
  test('blog-posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog-posts are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb[0].id).toBeDefined()
  })
})

describe('adding new blog-post', () => {
  test('HTTP POST req succesfully creates blog post', async () => {
    const testPost = {
      title: 'HTTP POST succesfully creates blog post',
      author: 'String',
      url: 'String',
      likes: 7357
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${dummyToken}`)
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)
    const ids = blogsInDb.map(blog => blog.id)
    expect(ids).toContain(response.body.id)
  })

  test('if likes is missing, defaults to 0', async () => {
    const testPost = {
      title: 'title',
      author: 'String',
      url: 'String'
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${dummyToken}`)
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('if title or url is missing, responds with 400', async () => {
    const testPost = {
      author: 'String',
      likes: 1
    }

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${dummyToken}`)
      .send(testPost)
      .expect(400)
  })

  test('fails with 401 if token is not provided', async () => {
    const testPost = {
      author: 'String',
      likes: 1
    }

    await api.post('/api/blogs')
      .set('Authorization', 'bearer WRONG_TOKEN')
      .send(testPost)
      .expect(401)
  })
})

describe('deleting blog-post', () => {
  test('succeeds with statuscode 204 if id is valid', async () => {

    // const blogToDelete = blogsAtStart[0]

    const testPost = {
      title: 'HTTP POST succesfully creates blog post',
      author: 'String',
      url: 'String',
      likes: 7357
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${dummyToken}`)
      .send(testPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `bearer ${dummyToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    const idsBlogsAtEnd = blogsAtEnd.map(b => b.id)
    expect(idsBlogsAtEnd).not.toContain(response.body.id)
  })
})

describe('updating blog-post', () => {
  test('succeeds with statuscode 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.title = 'updated post'

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    expect(result.body.id).toBe(blogToUpdate.id)
    expect(result.body.title).toBe('updated post')
  })
})



afterAll(() => {
  mongoose.connection.close()
})