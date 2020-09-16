/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UsersView from './components/UsersView';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/users">
          {user ? <UsersView /> : <LoginPage />}
          {/* {user !== null ? <UsersView /> : <Redirect to="/" />} */}
        </Route>
        <Route path="/">
          {user ? <HomePage /> : <LoginPage />}
        </Route>
      </Switch>
    </Router>
  );

  // if (user === null) {
  //   return (
  //     <div>
  //       <h2>log in to application</h2>
  //       <Notification isPositive={false} />
  //       <LoginForm />
  //     </div>
  //   );
  // }
  // return (
  //   <div>
  //     <h2>blogs</h2>
  //     <Notification isPositive />
  //     <span>
  //       {user.name}
  //       {' '}
  //       logged in
  //       {' '}
  //     </span>
  //     <button type="button" onClick={() => dispatch(logoutUser())}>log out</button>
  //     <NewBlog />
  //     <BlogList />
  //   </div>
  // );
};

export default App;
