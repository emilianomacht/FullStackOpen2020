/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';

// import { Nav } from 'react-bootstrap';
import LoginPage from './components/LoginPage';
// import HomePage from './components/HomePage';
import UsersView from './components/UsersView';
import NewBlog from './components/NewBlog';
import BlogList from './components/BlogList';
import User from './components/User';
import Navbar from './components/Navbar';
import { initializeUser } from './reducers/userReducer';
import BlogPage from './components/BlogPage';
import { initializeBlogs } from './reducers/blogsReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  // if (!user) return null;

  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/users/:id">
            {user ? (
              <>
                {/* <HomePage /> */}
                <Navbar />
                <User />
              </>
            ) : <LoginPage />}
          </Route>
          <Route path="/users">
            {user ? (
              <>
                {/* <HomePage /> */}
                <Navbar />
                <UsersView />
              </>
            ) : <LoginPage />}
            {/* {user !== null ? <UsersView /> : <Redirect to="/" />} */}
          </Route>
          <Route path="/blogs/:id">
            {user ? (
              <>
                {/* <HomePage /> */}
                <Navbar />
                <BlogPage />
              </>
            ) : <LoginPage />}
          </Route>
          <Route path="/">
            {user ? (
              <>
                {/* <HomePage /> */}
                <Navbar />
                <NewBlog />
                <BlogList />
              </>
            ) : <LoginPage />}
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
