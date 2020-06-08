import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('component blog renders only title and author', () => {
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

  const component = render(
    <Blog blog={blog} user={user} />
  )

  // expect(component.container).toHaveClass('title')
  // expect(component.container.querySelector('.title')).toHaveTextContent('test-title')
  // expect(component.container).toHaveClass('author')
  // expect(component.container.querySelector('.author')).toHaveTextContent('test-author')
  expect(component.container.querySelector('.blog')).toHaveTextContent('test-title')
  expect(component.container.querySelector('.blog')).toHaveTextContent('test-author')
  expect(component.container).not.toHaveClass('.url')
  // expect(component.container.querySelector('.url')).not.toHaveTextContent('test-url')
  expect(component.container).not.toHaveClass('.likes')
  // expect(component.container.querySelector('.likes')).not.toHaveTextContent('12390')
  expect(component.container).not.toHaveClass('.username')
  // expect(component.container.querySelector('.username')).not.toHaveTextContent('test-url')

})