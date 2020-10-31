/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Company', () => {
  beforeEach(() => {
    cy.abLoginAPI({ password: Cypress.env('ADMIN_PASSWORD'), email: Cypress.env('ADMIN_EMAIL') })
    cy.visit('resources/Company')
  })

  it('shows list of companies', () => {
    cy.get('.admin-bro_TableRow [data-property-name="email"]').should('have.length.gte', 1)
  })
})
