/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, addComment, setComment } from '../reducers/blogsReducer';

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const comment = useSelector((state) => state.blogs.newComment);
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
      <h2>comments</h2>
      <input type="text" id="comment" value={comment} onChange={(event) => dispatch(setComment(event.target.value))} />
      <button type="button" htmlFor="comment" onClick={() => dispatch(addComment(blogObj, {comment}))}>new comment</button>
      <ul>
        {blogObj.comments.map((cmnt, index) => <li key={index}>{cmnt}</li>)}
      </ul>
    </>
  );
};

export default BlogPage;
