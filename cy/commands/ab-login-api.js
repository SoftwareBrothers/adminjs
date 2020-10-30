/// <reference types="cypress" />

/**
 * @method abLogin
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
