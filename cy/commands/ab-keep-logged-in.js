/// <reference types="cypress" />

/**
 * @method abKeepLoggedIn
 * @memberof module:cy
 * @param {object} [options]
 * @param {object} [options.cookie]   session cookie name: default to Cypress.env('AB_COOKIE_NAME')
 * @example
 * before(() => {
 *   cy.abLogin()
 * })
 *
 * beforeAll(() => {
 *   cy.abKeepLoggedIn({ cookie: 'my-session-cookie' })
 *   cy.visit('your/path')
 * })
 */
Cypress.Commands.add('abKeepLoggedIn', ({ cookie }) => {
  Cypress.Cookies.preserveOnce(cookie || Cypress.env('AB_COOKIE_NAME'))
})
