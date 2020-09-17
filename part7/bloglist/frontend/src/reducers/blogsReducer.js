/* eslint-disable no-alert */
import blogService from '../services/blogs';

const initialState = {
  blogs: [],
  newBlog: {
    title: '',
    author: '',
    url: '',
    isFormVisible: false,
  },
  newComment: '',
};

// Action creators
export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

export const likeBlog = (blog) => async (dispatch) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };
  const resp = await blogService.update(updatedBlog);
  const blogToRender = {
    ...resp.data,
    user: updatedBlog.user,
  };
  dispatch({
    type: 'UPDATE',
    data: {
      ...blogToRender,
    },
  });
};

export const deleteBlog = (blog) => async (dispatch) => {
  const deleteConfirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
  if (!deleteConfirmation) return;

  await blogService.remove(blog);
  dispatch({
    type: 'DELETE',
    data: {
      ...blog,
    },
  });
};

export const newBlog = (blogToAdd, user) => async (dispatch) => {
  const resp = await blogService.create(blogToAdd);
  const blogToRender = {
    ...resp.data,
    user,
  };
  dispatch({
    type: 'ADD',
    data: blogToRender,
  });
};

export const addComment = (blog, comment) => async (dispatch) => {
  const resp = await blogService.addComment(blog, comment);
  // console.log('resp', resp);
  dispatch({
    type: 'NEW_COMMENT',
    data: resp.data,
  });
};

export const setComment = (value) => ({
  type: 'SET_COMMENT',
  data: value,
});
export const setNewBlogTitle = (value) => ({
  type: 'NEW_TITLE',
  data: value,
});
export const setNewBlogAuthor = (value) => ({
  type: 'NEW_AUTHOR',
  data: value,
});
export const setNewBlogUrl = (value) => ({
  type: 'NEW_URL',
  data: value,
});
export const toggleFormVisibility = () => ({
  type: 'TOGGLE_VISIBILITY',
});

// Main reducer
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  newState.newBlog = { ...state.newBlog };
  switch (action.type) {
    case 'INIT_BLOGS':
      newState.blogs = action.data;
      return newState;
    case 'UPDATE':
      newState.blogs = newState.blogs
        .map((blog) => (blog.id === action.data.id ? action.data : blog));
      return newState;
    case 'DELETE':
      newState.blogs = newState.blogs.filter((blog) => blog.id !== action.data.id);
      return newState;
    case 'ADD':
      newState.blogs = newState.blogs.concat(action.data);
      newState.newBlog.title = '';
      newState.newBlog.author = '';
      newState.newBlog.url = '';
      return newState;
    case 'NEW_TITLE':
      newState.newBlog.title = action.data;
      return newState;
    case 'NEW_AUTHOR':
      newState.newBlog.author = action.data;
      return newState;
    case 'NEW_URL':
      newState.newBlog.url = action.data;
      return newState;
    case 'SET_COMMENT':
      newState.newComment = action.data;
      return newState;
    case 'NEW_COMMENT':
      newState.blogs = newState.blogs
        .map((blog) => (blog.id === action.data.id ? action.data : blog));
      newState.newComment = '';
      return newState;
    case 'TOGGLE_VISIBILITY':
      newState.newBlog.isFormVisible = !newState.newBlog.isFormVisible;
      return newState;
    default:
      return state;
  }
};

export default reducer;
