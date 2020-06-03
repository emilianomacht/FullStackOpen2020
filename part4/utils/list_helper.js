// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, post) => post.likes + sum, 0)
}

module.exports = {
  dummy,
  totalLikes
}