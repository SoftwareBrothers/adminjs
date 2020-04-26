/// <reference types="cypress" />

context('SignIn page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in to the application', () => {
    cy.get('[name=email]').type(Cypress.env('ADMIN_EMAIL'))
    cy.get('[name=password]').type(Cypress.env('ADMIN_PASSWORD'))
    cy.get('button').click()

    cy.location('pathname').should('not.include', 'admin/login')
  })
})