/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import '../styles/Blog.css';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';

const Blog = ({
  blog,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [showDetails, setShowDetails] = useState(false);
  const showDeleteButton = blog.user.username === user.username;

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const details = (
    <div>
      <p className="url">{blog.url}</p>
      <p className="likes">
        likes
        <span className="cy-likes">{blog.likes}</span>
        {' '}
        <button type="button" className="like" onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      <p className="username">{blog.user.name}</p>
      {showDeleteButton ? <button type="button" onClick={() => dispatch(deleteBlog(blog))}>delete</button> : null}
    </div>
  );

  return (
    <div className="blog">
      <span className="blog-title">{blog.title}</span>
      {' '}
      {blog.author}
      {' '}
      {' '}
      <button type="button" className="show-details" onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails ? details : null}
    </div>
  );
};

// Blog.propTypes = {
//   handleNewLike: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
// };

export default Blog;
