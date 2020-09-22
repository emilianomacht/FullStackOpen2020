const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    },
    me: (root, args, { currentUser }) => {
      // console.log('currentUser', currentUser)
      return currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
        let respSave = await newBook.save();
        respSave._doc.author = {
          name: author.name,
          favoriteGenre: author.favoriteGenre
        }
        return respSave;

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
      
    },
    createUser: (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

    return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        // console.log('in server, context, currentUser', currentUser)
        return { currentUser };
      }
    }
  })
  
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })