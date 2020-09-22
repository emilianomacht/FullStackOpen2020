import { useLazyQuery } from '@apollo/client';
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { BOOKS_FILTERED_BY_GENRE } from '../queries';

const Books = ({ show, allBooks }) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [queryFilter, resultFilterQuery] = useLazyQuery(BOOKS_FILTERED_BY_GENRE);

  useEffect(() => {
    if (allBooks.data) {
      setBooks(allBooks.data.allBooks);

      const genresArr = [];
      allBooks.data.allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genresArr.includes(genre)) genresArr.push(genre);
        });
      });
      setGenres(genresArr);
    }
  }, [allBooks.data]);

  useEffect(() => {
    if (resultFilterQuery.data) setBooks(resultFilterQuery.data.allBooks);
  }, [resultFilterQuery.data]);

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
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button type="button" onClick={() => queryFilter({ variables: { genre: '' } })}>all genres</button>
      {genres.map((g) => <button key={g} type="button" onClick={() => queryFilter({ variables: { genre: g } })}>{g}</button>)}
    </div>
  );
};

export default Books;
