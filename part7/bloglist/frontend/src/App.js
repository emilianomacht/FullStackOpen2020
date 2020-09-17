/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UsersView from './components/UsersView';
import NewBlog from './components/NewBlog';
import BlogList from './components/BlogList';
import User from './components/User';

import { initializeUser } from './reducers/userReducer';
import BlogPage from './components/BlogPage';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/users/:id">
          {user ? (
            <>
              <HomePage />
              <User />
            </>
          ) : <LoginPage />}
        </Route>
        <Route path="/users">
          {user ? (
            <>
              <HomePage />
              <UsersView />
            </>
          ) : <LoginPage />}
          {/* {user !== null ? <UsersView /> : <Redirect to="/" />} */}
        </Route>
        <Route path="/blogs/:id">
          {user ? (
            <>
              <HomePage />
              <BlogPage />
            </>
          ) : <LoginPage />}
        </Route>
        <Route path="/">
          {user ? (
            <>
              <HomePage />
              <NewBlog />
              <BlogList />
            </>
          ) : <LoginPage />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
