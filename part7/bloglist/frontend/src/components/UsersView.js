/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';

const countBy = require('lodash.countby');

const HomePage = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const usersCounted = countBy(blogs, 'user.name');
  const usersCountedArr = Object.keys(usersCounted).map((key) => ([key, usersCounted[key]]));

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {usersCountedArr.map((entry) => (
            <tr key={entry[0]}>
              <td>
                <a href={`/users/${blogs.find((blog) => blog.user.name === entry[0]).user.id}`}>
                  {entry[0]}
                </a>
              </td>
              <td>{entry[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
