/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Tool', () => {
  before(() => {
    cy.abLoginAPI({ password: Cypress.env('ADMIN_PASSWORD'), email: Cypress.env('ADMIN_EMAIL') })
  })

  beforeEach(() => {
    cy.abKeepLoggedIn({ cookie: Cypress.env('COOKIE_NAME') })
    cy.visit('resources/Tool')
    cy.get('.admin-bro_PaginationLink')
    cy.get('.admin-bro_H2 .admin-bro_Badge').invoke('text').as('total')
  })

  it('shows a default pagination', function () {
    // 2 are prev and next links
    cy.get('.admin-bro_PaginationLink').should('have.length', +this.total / 10 + 2)
  })

  it('has first page selected and prev disabled', () => {
    // 2 are prev and next links
    cy.get('[data-testid="page-1"]').should('have.class', 'current')
    cy.get('[data-testid="previous"]').should('be.disabled')
  })

  it('navigates to the next page when clicking next', () => {
    cy.get('[data-testid="next"]').click()
    cy.get('[data-testid="page-2"]').should('have.class', 'current')
  })

  it('shows different number of pages when perPage is changed', function () {
    cy.visit('resources/Tool?perPage=20')
    cy.get('.admin-bro_PaginationLink').should('have.length', +this.total / 20 + 2)
  })
})
