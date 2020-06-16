import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    // eslint-disable-next-line no-param-reassign
    event.target.content.value = '';
    dispatch(createAnecdote(content));
    dispatch(setNotification(`You created the new anecdote: '${content}'`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => addAnecdote(event)}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
