/// <reference types="cypress" />
/// <reference types="../../support" />

context('SignIn page', () => {
  beforeEach(() => {
    cy.login()
  })

  it('logs in to the application', () => {
    cy.location('pathname').should('not.include', 'admin/login')
  })
})