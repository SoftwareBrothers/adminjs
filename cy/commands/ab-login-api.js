/// <reference types="cypress" />

/**
 * @method abLoginAPI
 * @memberof module:cy
 * @description
 * Comparing to {@link module:cy.abLogin} it doesn't render page - just performs an API call
 * and logs you in by storing the cookie. In order to preserve this cookie between the `it()`
 * calls you have to use {@link module:cy.abKeepLoggedIn} helper.
 * @param {object} [options]
 * @param {object} [options.email]          login email: default to Cypress.env('AB_EMAIL')
 * @param {object} [options.password]       login password: default to Cypress.env('AB_PASSWORD')
 * @param {object} [options.loginPath]      default to '/login'
 */
Cypress.Commands.add('abLoginAPI', ({ email, password, loginPath } = {}) => (
  cy.request('POST', loginPath || '/login', {
    email: email || Cypress.env('AB_EMAIL'),
    password: password || Cypress.env('AB_PASSWORD'),
  })
))
