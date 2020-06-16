/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

// eslint-disable-next-line arrow-body-style
const AnecdoteList = ({ anecdotes, filter }) => {
  const dispatch = useDispatch();
  // const anecdotes = useSelector((state) => state.anecdotes
  //   .filter((anecdote) => anecdote.content.toLowerCase().match(state.filter.toLowerCase())));

  // eslint-disable-next-line no-unused-vars
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {anecdotes
        .filter((anecdote) => anecdote.content.toLowerCase().match(filter.toLowerCase()))
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

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  // console.log(state);
  return ({
    anecdotes: state.anecdotes,
    filter: state.filter,
  });
};

// export default AnecdoteList;
const ConnectedList = connect(
  mapStateToProps,
)(AnecdoteList);

export default ConnectedList;
