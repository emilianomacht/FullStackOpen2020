/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  return (
    <div>
      <h3>blog post list</h3>
      {blogs
        .sort((A, B) => B.likes - A.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  );
};

export default BlogList;
