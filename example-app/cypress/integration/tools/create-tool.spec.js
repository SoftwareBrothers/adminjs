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
    cy.server()
    cy.route({ method: 'POST', url: 'admin/api/resources/Tool/actions/new' })
      .as('apiNew')

    const name = 'My Name'
    cy.get('[data-testid="property-edit-name"]').type(`${name}{enter}`)

    cy.wait('@apiNew').then((xhr) => {
      const { record } = xhr.response.body
      expect(record.params.description).to.be.undefined
      expect(record.params.name).to.eq(name)
    })

    cy.location('pathname').should('eq', '/admin/resources/Tool')

    // Remove the created record, because it brakes the pagination test otherwise.
    cy.get('td[data-property-name="name"]').contains(name).parents('tr')
      .find('[data-testid="actions-dropdown"]')
      .trigger('mouseover')
    cy.get('td[data-property-name="name"]').contains(name).parents('tr')
      .find('[data-testid="action-delete"]')
      .click()
  })
})
