import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      data: { id },
    });
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    // eslint-disable-next-line no-param-reassign
    event.target.content.value = '';
    dispatch({
      type: 'ADD',
      data: { content },
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has
            {' '}
            {anecdote.votes}
            <button type="button" onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={(event) => addAnecdote(event)}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
