/* eslint-disable react/prop-types */
import React from 'react';
// import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    // eslint-disable-next-line no-param-reassign
    event.target.content.value = '';
    // dispatch(createAnecdote(content));
    props.createAnecdote(content);
    // dispatch(setNotification(`You created the new anecdote: '${content}'`, 5));
    props.setNotification(`You created the new anecdote: '${content}'`, 5);
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

// export default AnecdoteForm;
const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedForm;
