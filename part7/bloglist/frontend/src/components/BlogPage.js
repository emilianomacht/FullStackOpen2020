/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../reducers/blogsReducer';

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const { id } = useParams();
  const blogObj = blogs.find((blog) => blog.id === id);
  // console.log('blogObj', blogObj);

  if (blogObj === undefined) return null;

  return (
    <>
      {/* <h3>{blogObj !== undefined ? blogObj.title : null}</h3> */}
      <h3>{blogObj.title}</h3>
      <a href={blogObj.url}>{blogObj.url}</a>
      <p className="likes">
        <span className="cy-likes">{blogObj.likes}</span>
        {' '}
        likes
        {' '}
        <button type="button" className="like" onClick={() => dispatch(likeBlog(blogObj))}>like</button>
      </p>
      <p>
        added by
        {' '}
        {blogObj.author}
      </p>
    </>
  );
};

export default BlogPage;
