/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Logs in to the applicationas a default user
     * @example
     * cy.login()
     */
    login(): Chainable<any>
  }
}