/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
// import Blog from './Blog';
import '../styles/Blog.css';
import ListGroup from 'react-bootstrap/ListGroup';
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  return (
    <div>
      <h3>blog post list</h3>
      <ListGroup variant="flush">
        {blogs
          .sort((A, B) => B.likes - A.likes)
          .map((blog) => (
            <ListGroup.Item key={blog.id}>
              <a href={`/blogs/${blog.id}`}>
                {blog.title}
              </a>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default BlogList;
