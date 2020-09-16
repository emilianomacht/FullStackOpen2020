/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import { initializeBlogs } from './reducers/blogsReducer';
import BlogList from './components/BlogList';
import { initializeUser, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification isPositive={false} />
        <LoginForm />
      </div>
    );
  }
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
      <NewBlog />
      <BlogList />
    </div>
  );
};

export default App;
