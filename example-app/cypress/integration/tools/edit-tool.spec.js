/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Tool/actions/edit', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(Cypress.env('COOKIE_NAME'))
    cy.visit('resources/Tool')
  })

  it('leaves null value in description when it was not alter', () => {
    cy.get('[data-testid="property-list-name"]').last().click()
    cy.get('[data-testid="action-edit"]').click()

    cy.server()
    cy.route({ method: 'POST', url: 'admin/api/resources/Tool/records/*/edit' })
      .as('apiEdit')
    cy.get('button[type="submit"]').click()

    cy.wait('@apiEdit').then((xhr) => {
      const { record } = xhr.response.body
      expect(record.params.description).to.eq(null)
    })
  })
})
