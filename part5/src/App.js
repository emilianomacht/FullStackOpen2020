import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      // console.log('user', user)
    } catch (exception) {
      console.log('exception', exception)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const handleNewBlogPost = async event => {
    event.preventDefault()
    try {
      await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      console.log('error', error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <input type="text" id="username" value={username} onChange={handleUsername} />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" value={password} onChange={handlePassword} />
          </div>
          <button onClick={handleSubmit}>log in</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <span>
        {user.name}
        {' '}
        logged in
        {' '}
      </span>
      <button onClick={handleLogOut}>log out</button>
      <h3>create new blog post</h3>
      <form onSubmit={handleNewBlogPost}>
        <div>
          <label htmlFor="title">title </label>
          <input 
            type="text" 
            id="title" 
            value={newBlogTitle} 
            onChange={({ target }) => setNewBlogTitle(target.value)} 
          />
        </div>
        <div>
          <label htmlFor="author">author </label>
          <input 
            type="text" 
            id="author" 
            value={newBlogAuthor} 
            onChange={({ target }) => setNewBlogAuthor(target.value)} 
          />
        </div>
        <div>
          <label htmlFor="url">url </label>
          <input 
            type="text" 
            id="url" 
            value={newBlogUrl} 
            onChange={({ target }) => setNewBlogUrl(target.value)} 
          />
        </div>
        <button onClick={handleNewBlogPost}>create</button>
      </form>
      <h3>blog post list</h3>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
