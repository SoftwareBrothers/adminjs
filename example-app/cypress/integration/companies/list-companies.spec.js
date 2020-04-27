/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Company', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('resources/Company')
  })

  it('shows list of companies', () => {
    cy.get('.admin-bro_TableRow [data-property-name="email"]').should('have.length', 1)
  })
})