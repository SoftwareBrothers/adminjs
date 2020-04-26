/// <reference types="cypress" />

context('resources/Company', () => {
  beforeEach(() => {
    cy.setCookie(Cypress.env('COOKIE_NAME'), Cypress.env('COOKIE'))
    cy.visit('resources/Company')
  })

  it('shows list of companies', () => {
    cy.get('.admin-bro_TableRow [data-property-name="email"]').should('have.length', 1)
  })
})