import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes
    .filter((anecdote) => anecdote.content.toLowerCase().match(state.filter.toLowerCase())));

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

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
              <button type="button" onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
