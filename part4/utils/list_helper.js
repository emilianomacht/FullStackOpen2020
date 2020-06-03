// const lodashArray = require('lodash/array')
const lodashCollection = require('lodash/collection')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}