/// <reference types="cypress" />
/// <reference types="../../support" />

context('SignIn page', () => {
  beforeEach(() => {
    cy.abLogin({ password: Cypress.env('ADMIN_PASSWORD'), email: Cypress.env('ADMIN_EMAIL') })
  })

  it('logs in to the application', () => {
    cy.location('pathname').should('not.include', 'admin/login')
  })
})
