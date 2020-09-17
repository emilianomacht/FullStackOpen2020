/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import './styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
// import HomePage from './components/HomePage';
import UsersView from './components/UsersView';
import NewBlog from './components/NewBlog';
import BlogList from './components/BlogList';
import User from './components/User';
import { initializeUser, logoutUser } from './reducers/userReducer';
import BlogPage from './components/BlogPage';
import { initializeBlogs } from './reducers/blogsReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  if (!user) return null;

  return (
    <Router>
      <div className="nav">
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        <p>
          {user.name}
          {' '}
          logged in
        </p>
        <button type="button" onClick={() => dispatch(logoutUser())}>log out</button>
      </div>

      <Switch>
        <Route path="/users/:id">
          {user ? (
            <>
              {/* <HomePage /> */}
              <User />
            </>
          ) : <LoginPage />}
        </Route>
        <Route path="/users">
          {user ? (
            <>
              {/* <HomePage /> */}
              <UsersView />
            </>
          ) : <LoginPage />}
          {/* {user !== null ? <UsersView /> : <Redirect to="/" />} */}
        </Route>
        <Route path="/blogs/:id">
          {user ? (
            <>
              {/* <HomePage /> */}
              <BlogPage />
            </>
          ) : <LoginPage />}
        </Route>
        <Route path="/">
          {user ? (
            <>
              {/* <HomePage /> */}
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
