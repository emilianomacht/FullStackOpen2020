/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const NewBlog = ({
  handleNewBlogPost
}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const createBlogPost = (event) => {
    event.preventDefault()
    console.log('hola')
    handleNewBlogPost({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogUrl('')
    setNewBlogAuthor('')
    setNewBlogTitle('')
  }

  return (
    <>
      <h3>create new blog post</h3>
      <form onSubmit={createBlogPost}>
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
        <button type='submit' onClick={createBlogPost}>create</button>
      </form>
    </>
  )
}

export default NewBlog