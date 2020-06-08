/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import '../styles/Blog.css'

const Blog = ({ blog, handleNewLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const newLike = () => {
    handleNewLike({
      ...blog,
      likes: blog.likes + 1
    })
  }

  const details = (
    <div>
      <p>blog.url</p>
      <p>likes {blog.likes}{' '}
        <button onClick={newLike}>like</button>
      </p>
      <p>{blog.user.name}</p>
    </div>
  )

  return (
    <div className='blog'>
      {blog.title} {blog.author} {' '}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails ? details : null}
    </div>
  )
}

export default Blog
