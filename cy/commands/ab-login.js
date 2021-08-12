/// <reference types="cypress" />

/**
 * @method abLogin
 * @description
 * logs you to the AdminJS. Since the system uses cookie for storing the session information, you
 * can use {@link module:cy.abKeepLoggedIn} helper to keep it between test cases.
 * @memberof module:cy
 * @param {object} [options]
 * @param {object} [options.email]          login email: default to Cypress.env('AB_EMAIL')
 * @param {object} [options.password]       login password: default to Cypress.env('AB_PASSWORD')
 * @param {object} [options.loginPath]      default to '/login'
 */
Cypress.Commands.add('abLogin', ({ email, password, loginPath } = {}) => {
  cy.visit(loginPath || '/login')
  cy.get('[name=email]').type(email || Cypress.env('AB_EMAIL'))
  cy.get('[name=password]').type(password || Cypress.env('AB_PASSWORD'))
  cy.get('button').click()
})
