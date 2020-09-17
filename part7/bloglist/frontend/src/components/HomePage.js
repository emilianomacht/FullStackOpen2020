/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification';
import { initializeBlogs } from '../reducers/blogsReducer';
// import NewBlog from './NewBlog';
// import BlogList from './BlogList';
import { logoutUser } from '../reducers/userReducer';

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <h2>blogs</h2>
      <Notification isPositive />
      <span>
        {user.name}
        {' '}
        logged in
        {' '}
      </span>
      <button type="button" onClick={() => dispatch(logoutUser())}>log out</button>
      {/* <NewBlog />
      <BlogList /> */}
    </div>
  );
};

export default HomePage;
