/* eslint-disable linebreak-style */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/Blog.css'

const Blog = ({ blog, handleNewLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const showDeleteButton = blog.user.username === user.username

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
      {showDeleteButton ? <button onClick={() => handleDelete(blog)}>delete</button> : null}
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

Blog.propTypes = {
  handleNewLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
