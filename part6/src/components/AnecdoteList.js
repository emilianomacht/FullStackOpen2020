import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  return (
    <div>
      {anecdotes
        .sort((A, B) => B.votes - A.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has
              {' '}
              {anecdote.votes}
              <button type="button" onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteForm;
