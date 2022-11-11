describe('Blog app', function () {
  let user, user2
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    user = {
      username: 'JamesM',
      name: 'James Muller',
      password: 'james@.23'
    }
    user2 = {
      username: 'Mike',
      name: 'Mike Spencer',
      password: 'mikeS45'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('Login to application')
  })
  describe('Login', () => {
    it('succeds with correct credentials', () => {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('button').click()

      cy.contains(`${user.name} logged in`)
    })
    it('fials with wrong credentisals', () => {
      cy.get('#username').type(user.username)
      cy.get('#password').type('hello')
      cy.get('button').click()

      cy.get('.error').contains('Wrong Credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('button').click()
    })
    it('can create new blog', () => {
      cy.contains('new blog').click()
      const blog = {
        title: 'Running tests with cypress',
        author: 'James Muller',
        url: 'cypress.info/welcome'
      }
      cy.get('.title').type(blog.title)
      cy.get('.author').type(blog.author)
      cy.get('.url').type(blog.url)

      cy.get('.create').click()

      cy.contains(`${blog.title} ${blog.author}`)
    })
    describe('when blog is created', () => {
      const blog = {
        title: 'New blog is created.',
        author: 'Mark Wise',
        url: 'markwise.com/blog'
      }
      const blog2 = {
        title: 'Blog with most likes.',
        author: 'Mark Wise',
        url: 'markwise.com/blog'
      }
      beforeEach(() => {
        cy.contains('new blog').click()

        cy.get('.title').type(blog.title)
        cy.get('.author').type(blog.author)
        cy.get('.url').type(blog.url)

        cy.get('.create').click()
      })
      it('can like a blog', () => {

        cy.get('.visible').click()
        cy.get('.like').click()
        cy.get('.like').click().then(() => {
          cy.contains('2')
        })


      })
      it('user can remove the blog', () => {
        cy.get('.visible').click()
        cy.contains('Remove').click()
      })
      it('other users can not delete the blog', () => {
        cy.contains('Logout').click()
        cy.get('#username').type(user2.username)
        cy.get('#password').type(user2.password)
        cy.get('button').click()

        cy.get('.visible').click()
        cy.get('.details').should('not.contain', 'Remove')
      })
      it.only('blogs are sorted according to likes', () => {
        cy.contains('new blog').click()

        cy.get('.title').type(blog2.title)
        cy.get('.author').type(blog2.author)
        cy.get('.url').type(blog2.url)

        cy.get('.create').click()
        cy.wait(2000)
        // cy.contains(`${blog.title}`).siblings('.visible').click()
        cy.get('.blogs').eq(1).find('button').contains('view').click()
        cy.get('.blogs').eq(1).find('button').contains('Like').click()

        cy.wait(100)
        cy.get('.blogs').eq(0).should('contain', `${blog2.title} ${blog2.author}`)
      })
    })

  })
})