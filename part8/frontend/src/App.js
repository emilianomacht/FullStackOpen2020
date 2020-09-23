import React, { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';
import {
  ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED,
} from './queries';

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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);
      updateCacheWith(addedBook);
    },
  });

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
        allBooks={resultAllBooks}
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
