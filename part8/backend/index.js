const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://herokuApp:e84Ce234j3WcW7R5@cluster0-lkikw.mongodb.net/part8?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let booksCopy = await Book.find({}).populate('author');
      if (args.author) booksCopy = booksCopy.filter(book => book.author.name === args.author);
      if (args.genre) booksCopy = booksCopy.filter(book => book.genres.includes(args.genre));
      return booksCopy;
    },
    allAuthors: async () => {
      let authors = await Author.find({});
      const books = await Book.find({}).populate('author');
      authors = authors.map(author => {
        return {
          ...author._doc,
          bookCount: books.filter(book => book.author.name === author.name).length,
        }
      });
      return authors;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({ name: args.author });
      let author = {};

      if (!authors.length) {
        author = new Author({
          name: args.author,
          id: uuidv4()
        });

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

      } else {
        author = authors[0];
      }

      const newBook = new Book({
        title: args.title,
        author: author.id,
        published: args.published,
        genres: args.genres,
      });

      try {
        return newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      const authors = await Author.find({ name: args.name });
      if (!authors.length) {
        return null;      
      }
      
      const authorToUpdate = {
        name: authors[0].name,
        born: args.setBornTo,
        id: authors[0].id
      };

      try {
        await Author.findByIdAndUpdate(authors[0].id, authorToUpdate);
        const updatedAuthor = await Author.findById(authors[0].id);
        return updatedAuthor;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
    }
  }
}

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })