/// <reference types="cypress" />

/**
 * @method abGetProperty
 * @param {string} propertyPath
 * @param {string} [selector=null]
 */
Cypress.Commands.add('abGetProperty', (propertyPath, selector = null) => {
  let propertySelector = `[data-testid$="-${propertyPath}"]`
  if (selector) {
    propertySelector = [propertySelector, selector].join(' ')
  }
  return cy.get(propertySelector)
})
