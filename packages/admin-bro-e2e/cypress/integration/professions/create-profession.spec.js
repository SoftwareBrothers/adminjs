/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Profession/actions/new', () => {
  before(() => {
    cy.abLoginAPI({ password: Cypress.env('ADMIN_PASSWORD'), email: Cypress.env('ADMIN_EMAIL') })
  })

  beforeEach(() => {
    cy.abKeepLoggedIn({ cookie: Cypress.env('COOKIE_NAME') })
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

  it('does not show hidden nested property', () => {
    cy.get('[data-testid="property-edit-affects.speed.easy"]').should('not.exist')
  })
})
