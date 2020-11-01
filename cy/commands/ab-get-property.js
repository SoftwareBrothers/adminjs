/// <reference types="cypress" />

/**
 * @method abGetProperty
 * @description
 * ### Usage
 *
 * ```javascript
 * // your property in AdminBro
 * resourceOptions: {
 *   properties: {
 *     isAdmin: {...}
 *   }
 * }
 * ```
 *
 * ```javascript
 * // accessing it in test.
 * cy.abGetProperty('isAdmin', 'input[type="checkbox"]')
 * ```
 *
 * `abGetProperty` returns the wrapper Section for a given property. You can pass inner element
 * which allows you to select `input`, `label`, `options`, etc. inside it.
 *
 * @memberof module:cy
 * @param {string} path           path of the property
 * @param {string} [selector=null]
 * @example
 * it('shows disabled checkBox', () => {
 *   cy.abGetProperty('isAdmin', 'input[type="checkbox"]')
 *     .should('be.disabled')
 *     .should('not.be.checked')
 *
 *   cy.abGetProperty('isAdmin', 'label')
 *     .click()
 *     .should('not.be.checked')
 * })
 */
Cypress.Commands.add('abGetProperty', (path, selector = null) => {
  let propertySelector = `[data-testid$="-${path}"]`
  if (selector) {
    propertySelector = [propertySelector, selector].join(' ')
  }
  return cy.get(propertySelector)
})
