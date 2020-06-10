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

    it.only('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong-username')
      cy.get('#password').type('wrong-password')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('.negative').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})