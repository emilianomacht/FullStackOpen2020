describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      'username': 'test-user',
      'name': 'test-name',
      'password': 'test-password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('username')
    cy.get('#username')
    cy.contains('password')
    cy.get('#password')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('test-user')
      cy.get('#password').type('test-password')
      cy.get('#login-button').click()
      cy.contains('test-name logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong-username')
      cy.get('#password').type('wrong-password')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('.negative').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'test-user', password: 'test-password'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      const title = 'test-title'
      const author = 'test-author'
      const url = 'test-url'
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.get('button[type=submit]').should('contain', 'create').click()

      cy.contains(`New blog post by ${author} added`)
      cy.get('.positive').should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains(`${title} ${author}`)
      cy.contains('view').click()
      cy.contains(`${url}`)
      cy.contains('likes 0')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      const title = 'test-title'
      const author = 'test-author'
      const url = 'test-url'
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.get('button[type=submit]').should('contain', 'create').click()

      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('create new blog').click()
      const title = 'test-title'
      const author = 'test-author'
      const url = 'test-url'
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type(url)
      cy.get('button[type=submit]').should('contain', 'create').click()

      cy.contains(`${title} ${author}`)

      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains(`${title} ${author}`).should('not.exist')
    })

    it.only('Blogs are ordered according to likes', function() {
      const loggedUser = window.localStorage.getItem('loggedUser')
      const user = JSON.parse(loggedUser)

      const createBlog = (title, author, url, likes) => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          headers: {
            authorization: `bearer ${user.token}`
          },
          body: {
            title,
            author,
            url,
            likes,
          }
        })
      }

      const checkBlogOrder = (title, likes, index) => {
        if (index === 0) {
          expect(title).to.equal('title2')
          expect(likes).to.equal(7)
        } else if (index === 1) {
          expect(title).to.equal('title3')
          expect(likes).to.equal(5)
        } else if (index === 2) {
          expect(title).to.equal('title1')
          expect(likes).to.equal(4)
        }
      }

      createBlog('title1', 'author1', 'url1', 4)
      createBlog('title2', 'author2', 'url2', 7)
      createBlog('title3', 'author3', 'url3', 5)

      cy.visit('http://localhost:3000')

      cy.get('.blog').each(($el, index) => {
        cy.wrap($el).within(() => {
          let cyTitle = 'hola'
          let cyLikes = 0
          cy.get('.show-details').click()
          // title = cy.get('.blog-title').text()
          cy.get('.blog-title').then($el => {
            cyTitle = $el.text()
          })
          cy.get('.cy-likes').then($el => {
            cyLikes = Number.parseInt($el.text())
            checkBlogOrder(cyTitle, cyLikes, index)
          })
        })
      })

    })
  })
})