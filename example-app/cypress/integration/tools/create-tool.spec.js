/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Tool/actions/new', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(Cypress.env('COOKIE_NAME'))
    cy.visit('resources/Tool/actions/new')
  })

  it('creates new tool by hitting enter instead of clicking submit', () => {
    cy.get('[data-testid="property-edit-name"]').type('My Name{enter}')

    cy.location('pathname').should('eq', '/admin/resources/Tool')
  })
})
