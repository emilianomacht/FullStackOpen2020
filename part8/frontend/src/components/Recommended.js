/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const Recommended = ({ show, resultMe, resultAllBooks }) => {
  const [books, setBooks] = useState([]);
  const [favGenre, setFavGenre] = useState('');

  useEffect(() => {
    if (resultMe.data) {
      setFavGenre(resultMe.data.me.favoriteGenre);
    }
  }, [resultMe.data]);
  useEffect(() => {
    if (resultAllBooks.data) setBooks(resultAllBooks.data.allBooks);
  }, [resultAllBooks.data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre
        {' '}
        <strong>
          {favGenre}
        </strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter((book) => book.genres.includes(favGenre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
