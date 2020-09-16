/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification';
import { logoutUser } from '../reducers/userReducer';

const countBy = require('lodash.countby');

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs.blogs);
  // console.log('blogs', blogs);
  const usersCounted = countBy(blogs, 'user.name');
  const usersCountedArr = Object.keys(usersCounted).map((key) => ([key, usersCounted[key]]));

  // const tableUsers = () => {
  //   for (name in usersCounted) {
  //     return (
  //       <p>
  //         {name}
  //         {' '}
  //         {usersCounted[name]}
  //       </p>
  //     );
  //   }
  // };
  // console.log('lod', lod)
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
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {usersCountedArr.map((entry) => (
            <tr key={entry[0]}>
              <td>{entry[0]}</td>
              <td>{entry[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
