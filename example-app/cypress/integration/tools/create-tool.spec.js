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
    const name = 'My Name'
    cy.get('[data-testid="property-edit-name"]').type(`${name}{enter}`)

    cy.location('pathname').should('eq', '/admin/resources/Tool')

    cy.get('td[data-property-name="name"]').contains(name).parents('tr')
      .find('[data-testid="actions-dropdown"]')
      .trigger('mouseover')
    cy.get('td[data-property-name="name"]').contains(name).parents('tr')
      .find('[data-testid="action-delete"]')
      .click()
  })
})
