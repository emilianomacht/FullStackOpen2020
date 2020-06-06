import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUsername = ({ target }) => {
    setUsername(target.value);
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
      setUser(user)
      setUsername('')
      setPassword('')
      // console.log('user', user)
    } catch (exception) {
      console.log('exception', exception)
      setUsername('')
      setPassword('')
    }
  }

  if (user === null) {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>username</label>
          <input type='text' id='username' value={username} onChange={handleUsername}></input>
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input type='password' id='password' value={password} onChange={handlePassword}></input>
        </div>
        <button onClick={handleSubmit}>log in</button>
      </form>
      </div>
  )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App