/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Profession/actions/new', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(Cypress.env('COOKIE_NAME'))
    cy.visit('resources/Profession/actions/new')
  })

  it('shows required mark (*) by random content', () => {
    cy.get('[data-testid="property-edit-randomContent"] label')
      .then(($label) => {
        const win = $label[0].ownerDocument.defaultView
        const before = win.getComputedStyle($label[0], 'before')
        const contentValue = before.getPropertyValue('content')
        expect(contentValue).to.eq('"*"')
      })
    cy.get('[data-testid="property-edit-otherNotRequired"] label')
      .then(($label) => {
        const win = $label[0].ownerDocument.defaultView
        const before = win.getComputedStyle($label[0], 'before')
        const contentValue = before.getPropertyValue('content')
        expect(contentValue).to.eq('""')
      })
  })
})
