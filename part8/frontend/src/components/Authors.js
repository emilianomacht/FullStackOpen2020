/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const Authors = ({
  show, loading, result, setError,
}) => {
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: () => {
      setError('Error, try again');
    },
  });

  const updateAuthor = () => {
    editAuthor({ variables: { name: newName, setBornTo: parseInt(newDate, 10) } });
    setNewDate('');
    setNewName('');
  };

  if (!show) {
    return null;
  }

  let authors = [];

  if (loading) {
    return (
      <>
        <h2>authors</h2>
        <div>Loading...</div>
      </>
    );
  }
  // console.log('result', result);
  authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      {/* <div>
        <label htmlFor="newName">name</label>
        <input
          id="newName"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          />
      </div> */}
      <select value={newName} onChange={(event) => setNewName(event.target.value)}>
        {authors
          .map((author) => <option key={author.id} value={author.name}>{author.name}</option>)}
      </select>
      <div>
        <label htmlFor="newDate">
          born
          <input
            id="newDate"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </label>
      </div>
      <button type="button" onClick={updateAuthor}>update author</button>
    </div>
  );
};

export default Authors;
