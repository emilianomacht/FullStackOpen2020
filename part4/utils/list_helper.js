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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}