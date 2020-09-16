/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  newBlog, setNewBlogTitle, setNewBlogAuthor, setNewBlogUrl, toggleFormVisibility,
} from '../reducers/blogsReducer';

const NewBlog = () => {
  const dispatch = useDispatch();
  const newBlogState = useSelector((state) => state.blogs.newBlog);
  const user = useSelector((state) => state.user);

  const createBlogPost = (event) => {
    event.preventDefault();
    dispatch(newBlog({
      title: newBlogState.title,
      author: newBlogState.author,
      url: newBlogState.url,
    }, user));
  };

  if (!newBlogState.isFormVisible) {
    return (
      <div>
        <button type="submit" onClick={() => dispatch(toggleFormVisibility())}>add new blog</button>
      </div>
    );
  }

  return (
    <>
      <h3>create new blog post</h3>
      <form onSubmit={createBlogPost}>
        <div>
          <label htmlFor="title">title </label>
          <input
            type="text"
            id="title"
            value={newBlogState.title}
            onChange={(event) => dispatch(setNewBlogTitle(event.target.value))}
          />
        </div>
        <div>
          <label htmlFor="author">author </label>
          <input
            type="text"
            id="author"
            value={newBlogState.author}
            onChange={(event) => dispatch(setNewBlogAuthor(event.target.value))}
          />
        </div>
        <div>
          <label htmlFor="url">url </label>
          <input
            type="text"
            id="url"
            value={newBlogState.url}
            onChange={(event) => dispatch(setNewBlogUrl(event.target.value))}
          />
        </div>
        <button type="submit" onClick={createBlogPost}>create</button>
      </form>
      <button type="submit" onClick={() => dispatch(toggleFormVisibility())}>hide form</button>
    </>
  );
};

// NewBlog.propTypes = {
//   handleNewBlogPost: PropTypes.func.isRequired,
// };

export default NewBlog;
