/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const Books = ({ show, result }) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);

      const genresArr = [];
      result.data.allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genresArr.includes(genre)) genresArr.push(genre);
        });
      });
      setGenres(genresArr);
    }
  }, [result.data]);

  // if (loading) {
  //   return (
  //     <>
  //       <h2>books</h2>
  //       <div>Loading...</div>
  //     </>
  //   );
  // }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      {filter !== 'ALL'
        ? (
          <p>
            showing books in genre
            {' '}
            <strong>{filter}</strong>
          </p>
        )
        : 'showing books in all genres'}
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
            .filter((book) => {
              if (filter === 'ALL') return true;
              return book.genres.includes(filter);
            })
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button type="button" onClick={() => setFilter('ALL')}>all genres</button>
      {genres.map((g) => <button key={g} type="button" onClick={() => setFilter(g)}>{g}</button>)}
    </div>
  );
};

export default Books;
