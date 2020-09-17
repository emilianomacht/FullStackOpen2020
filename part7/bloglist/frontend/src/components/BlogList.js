/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
// import Blog from './Blog';
import '../styles/Blog.css';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  return (
    <div>
      <h3>blog post list</h3>
      {blogs
        .sort((A, B) => B.likes - A.likes)
        .map((blog) => (
          <div className="blog" key={blog.id}>
            <a href={`/blogs/${blog.id}`}>
              {blog.title}
            </a>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
