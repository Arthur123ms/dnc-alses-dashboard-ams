describe('Login flow Corect Credentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
  })

  it('should login with valid credentials', () => {
    cy.get('input[type="email"]').type('arthur123@gmail.com')
    cy.get('input[type="password"]').type('Arthur12#')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
    cy.get('header').should('be.visible')
  })

})


describe('Login flow Invallid Credentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
  })

  it('should login with ivalid credentials', () => {
    cy.get('input[type="email"').type('arthur@gmail.com')
    cy.get('input[type="password"').type('arthur12#')
    cy.get('button[type="submit"').click()
    cy.contains('Email e/ou senhas inválidos').should('be.visible')
  })

})