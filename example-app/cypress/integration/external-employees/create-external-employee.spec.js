/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/ExternalEmployees/actions/new', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(Cypress.env('COOKIE_NAME'))
    cy.visit('resources/ExternalEmployees/actions/new')
  })

  it('shows required mark (*) by email', () => {
    cy.get('[data-testid="property-edit-email"] label')
      .then(($label) => {
        const win = $label[0].ownerDocument.defaultView
        const before = win.getComputedStyle($label[0], 'before')
        const contentValue = before.getPropertyValue('content')
        expect(contentValue).to.eq('"*"')
      })
  })
})
