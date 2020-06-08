import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import NewBlog from './NewBlog'

const blog = {
  title: 'test-title',
  author: 'test-author',
  url: 'test-url',
  likes: 12390,
  user: {
    name: 'test-user-name'
  }
}

const user = {
  username: 'test-user-name'
}

test('component blog renders only title and author', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container.querySelector('.blog')).toHaveTextContent('test-title')
  expect(component.container.querySelector('.blog')).toHaveTextContent('test-author')
  expect(component.container).not.toHaveClass('.url')
  expect(component.container).not.toHaveClass('.likes')
  expect(component.container).not.toHaveClass('.username')

})

test('url, likes and username are shown when view button is clicked', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container.querySelector('.blog')).toHaveTextContent('test-title')
  expect(component.container.querySelector('.blog')).toHaveTextContent('test-author')
  expect(component.container.querySelector('.url')).toHaveTextContent('test-url')
  expect(component.container.querySelector('.likes')).toHaveTextContent('12390')
  expect(component.container.querySelector('.username')).toHaveTextContent('test-user-name')
})

test('handleLike is called twice if button is clicked twice', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleNewLike={mockHandler} />
  )
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('new blog form submits correct inputs', () => {
  const mockHandler = jest.fn()

  const component = render(
    <NewBlog handleNewBlogPost={mockHandler}/>
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'title-input test' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'author-input test' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'url-input test' }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]['title']).toBe('title-input test')
  expect(mockHandler.mock.calls[0][0]['author']).toBe('author-input test')
  expect(mockHandler.mock.calls[0][0]['url']).toBe('url-input test')

})

// expect(component.container).toHaveClass('title')
// expect(component.container.querySelector('.title')).toHaveTextContent('test-title')
// expect(component.container).toHaveClass('author')
// expect(component.container.querySelector('.author')).toHaveTextContent('test-author')
// expect(component.container.querySelector('.blog')).toHaveTextContent('test-title')
// expect(component.container.querySelector('.blog')).toHaveTextContent('test-author')
// expect(component.container).not.toHaveClass('.url')
// expect(component.container.querySelector('.url')).not.toHaveTextContent('test-url')
// expect(component.container).not.toHaveClass('.likes')
// expect(component.container.querySelector('.likes')).not.toHaveTextContent('12390')
// expect(component.container).not.toHaveClass('.username')
// expect(component.container.querySelector('.username')).not.toHaveTextContent('test-url')