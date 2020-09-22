import React, { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const resultAllAuthors = useQuery(ALL_AUTHORS);
  const resultAllBooks = useQuery(ALL_BOOKS);
  const resultMe = useQuery(ME);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (resultAllAuthors.loading || resultAllBooks.loading) {
    return (
      <h2>Loading app...</h2>
    );
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <div>
        <button type="button" onClick={() => setPage('authors')}>authors</button>
        <button type="button" onClick={() => setPage('books')}>books</button>
        {token
          ? (
            <>
              <button type="button" onClick={() => setPage('add')}>add book</button>
              <button type="button" onClick={() => setPage('recommended')}>recommended</button>
              <button type="button" onClick={() => logout()}>logout</button>
            </>
          )
          : <button type="button" onClick={() => setPage('login')}>login</button>}

      </div>

      <Authors
        show={page === 'authors'}
        result={resultAllAuthors}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        result={resultAllBooks}
      />

      <Recommended
        show={page === 'recommended'}
        resultMe={resultMe}
        resultAllBooks={resultAllBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
      />

    </>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  );
};

export default App;
