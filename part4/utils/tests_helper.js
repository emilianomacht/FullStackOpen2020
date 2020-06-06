const Blog = require('../models/blog')
const User = require('../models/user')
const lodashArray = require('lodash/array')
const lodashCollection = require('lodash/collection')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, post) => post.likes + sum, 0)
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = [...blogs]
  sortedBlogs.sort((postA, postB) => postB.likes - postA.likes)
  return ({
    title: sortedBlogs[0].title,
    author: sortedBlogs[0].author,
    likes: sortedBlogs[0].likes
  })
}

const mostBlogs = (blogs) => {
  let authors = lodashCollection.countBy(blogs, 'author')
  let authorsArray = []
  for (let author in authors) {
    authorsArray.push({
      author: author,
      blogs: authors[author]
    })
  }
  authorsArray.sort((A, B) => B.blogs - A.blogs)
  return authorsArray[0]
}

const mostLikes = (blogs) => {
  let authors = lodashArray
    .uniqBy(blogs, 'author')
    .map(obj => ({
      author: obj.author,
      likes: 0 }))
  authors.forEach(author => {
    const authorName = author.author
    blogs.forEach(post => {
      if (post.author === authorName) {
        author.likes += post.likes
      }
    })
  })
  authors.sort((A, B) => B.likes - A.likes)
  return authors[0]
}

const initialBlogs = [{ _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialUsers = [
  { username: 'uname1', name: 'n1', password: 'hola1' },
  { username: 'uname2', name: 'n2', password: 'hola2' },
  { username: 'uname3', name: 'n3', password: 'hola3' },
  { username: 'uname4', name: 'n4', password: 'hola4' },
  { username: 'uname5', name: 'n5', password: 'hola5' },
]

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  blogsInDb,
  usersInDb,
  initialUsers
}