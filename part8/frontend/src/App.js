
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  };

  const resultAllAuthors = useQuery(ALL_AUTHORS);
  const resultAllBooks = useQuery(ALL_BOOKS);

  return (
    <>
    <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        loading={resultAllAuthors.loading}
        result={resultAllAuthors}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        loading={resultAllBooks.loading}
        result={resultAllBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

    </>
  )
}

const Notify = ({ errorMessage }) => {  
  if ( !errorMessage ) return null  ;
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
)}

export default App