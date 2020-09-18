
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'


const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`
const ALL_BOOKS = gql`
query {
  allBooks  {
    title
    author
    published
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors');

  const resultAllAuthors = useQuery(ALL_AUTHORS);
  const resultAllBooks = useQuery(ALL_BOOKS);

  // console.log('result.data', result.data)



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        loading={resultAllAuthors.loading}
        result={resultAllAuthors}
      />

      <Books
        show={page === 'books'}
        loading={resultAllBooks.loading}
        result={resultAllBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App