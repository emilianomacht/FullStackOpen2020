import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [notificationMessage, setNotificationMessage] = useState(null)

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

  const handleLogin = async (event) => {
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
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const handleNewBlogPost = async (newBlogPost) => {
    try {
      const resp = await blogService.create(newBlogPost)
      setBlogs(blogs.concat(resp.data))

      setNotificationMessage(`New blog post by ${newBlogPost.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleNewLike = async (updatedPost) => {
    try {
      const resp = await blogService.update(updatedPost)
      const blogToRender = {
        ...resp.data,
        user: updatedPost.user
      }
      const updatedBlogs = blogs
        .map(blog => blog.id === resp.data.id ? blogToRender : blog)
      setBlogs(updatedBlogs)
    } catch (error) {
      console.log('error', error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} isPositive={false} />
        <Toggable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsername={({ target }) => setUsername(target.value)}
            handlePassword={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Toggable>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} isPositive={true} />
      <span>
        {user.name}
        {' '}
        logged in
        {' '}
      </span>
      <button onClick={handleLogOut}>log out</button>
      <Toggable buttonLabel='create new blog' >
        <NewBlog 
          handleNewBlogPost={handleNewBlogPost}
        />
      </Toggable>
      <h3>blog post list</h3>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} handleNewLike={handleNewLike} />)}
    </div>
  )
}

export default App
