/// <reference types="cypress" />
/// <reference types="../../support" />

context('Dashboard Page', () => {
  beforeEach(() => {
    cy.login()
  })

  it('shows overridden sidebar footer', () => {
    cy.get('[data-testid=sidebarFooterOverride]').should('have.text', 'Custom Sidebar element')
  })
})
