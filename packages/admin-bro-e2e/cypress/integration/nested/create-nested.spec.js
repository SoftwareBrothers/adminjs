/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Nested/actions/new', () => {
  before(() => {
    cy.abLoginAPI({ password: Cypress.env('ADMIN_PASSWORD'), email: Cypress.env('ADMIN_EMAIL') })
  })

  beforeEach(() => {
    cy.abKeepLoggedIn({ cookie: Cypress.env('COOKIE_NAME') })
    cy.visit('resources/Nested/actions/new')
  })

  it('fills name when button is clicked', () => {
    cy.get('[data-testid="name-button"]').click()
    cy.get('[data-testid="property-edit-name"] input')
      .should('have.value', 'my new name')
  })
})
