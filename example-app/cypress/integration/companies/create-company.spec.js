/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Company/actions/new', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('resources/Company/actions/new')
  })

  it('shows password property', () => {
    const typedPassword = 'password'

    cy.get('[data-testid="property-edit-password"] input[type="password"]').type(typedPassword)
    cy.get('[data-testid="property-edit-password"] button').click()

    cy.get('[data-testid="property-edit-password"] input[type="input"]').should('have.value', typedPassword)
  })

  it('shows disabled checkBox', () => {
    cy.get('[data-testid="property-edit-isAdmin"] input[type="checkbox"]')
      .should('be.disabled')
      .should('not.be.checked')
    
    cy.get('[data-testid="property-edit-isAdmin"] label')
      .click()
      .should('not.be.checked')
  })

  it('preserve regular checkbox value when validation fails', () => {
    cy.get('[data-testid="property-edit-isBig"] input[type="checkbox"]')
      .should('not.be.disabled')
      .should('not.be.checked')
    
    // clicking checkbox twice
    cy.get('[data-testid="property-edit-isBig"] label')
      .click().click()

    cy.get('form button[data-testid="button-save"]').click()

    cy.get('[data-testid="property-edit-isBig"] input[type="checkbox"]')
      .should('not.be.checked')
  })
})