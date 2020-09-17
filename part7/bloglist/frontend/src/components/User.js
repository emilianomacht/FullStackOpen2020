/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const { id } = useParams();
  const userObj = blogs.find((blog) => blog.user.id === id);

  return (
    <>
      <h3>{userObj !== undefined ? userObj.user.name : null}</h3>
      <h4>added blogs</h4>
      <ul>
        {blogs
          .filter((blog) => blog.user.id === id)
          .map((blog) => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </>
  );
};

export default User;
