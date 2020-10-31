/// <reference types="cypress" />
/// <reference types="admin-bro/cy" />
/// <reference types="../../support" />

context('resources/Company/actions/new', () => {
  before(() => {
    cy.abLoginAPI({ password: Cypress.env('ADMIN_PASSWORD'), email: Cypress.env('ADMIN_EMAIL') })
  })

  beforeEach(() => {
    cy.abKeepLoggedIn({ cookie: Cypress.env('COOKIE_NAME') })
    cy.visit('resources/Company/actions/new')
  })

  it('shows password property', () => {
    const typedPassword = 'password'

    cy.abGetProperty('password', 'input[type="password"]')
      .type(typedPassword)
    cy.abGetProperty('password', 'button')
      .click()

    cy.abGetProperty('password', 'input[type="input"]')
      .should('have.value', typedPassword)
  })

  it('shows disabled checkBox', () => {
    cy.abGetProperty('isAdmin', 'input[type="checkbox"]')
      .should('be.disabled')
      .should('not.be.checked')

    cy.abGetProperty('isAdmin', 'label')
      .click()
      .should('not.be.checked')
  })

  it('show translated select labels and button', () => {
    cy.abGetProperty('companySize', 'input')
      .click()
      .get('[class$="option"]').then(options => options
        .map((k, option) => cy.$$(option).text()).toArray())
      .should('have.members', ['superBig', 's', 't'])

    cy.abGetProperty('tags', 'button').should('have.text', 'Add new Tag')
  })

  it('preserve regular checkbox value when validation fails', () => {
    cy.abGetProperty('isBig', 'input[type="checkbox"]')
      .should('not.be.disabled')
      .should('not.be.checked')

    // clicking checkbox twice
    cy.abGetProperty('isBig', 'label').click().click()

    cy.get('form button[data-testid="button-save"]').click()

    cy.abGetProperty('isBig', 'input[type="checkbox"]')
      .should('not.be.checked')
  })

  it('creates new record and print it with translated properties', () => {
    const data = {
      email: 'test@test.com',
      companyName: 'some company',
      address: 'some address',
      companySize: 'superBig',
    }

    cy.abGetProperty('email', 'input')
      .type(data.email)
    cy.abGetProperty('companyName', 'input')
      .type(data.companyName)
    cy.abGetProperty('address', 'input')
      .type(data.address)
    cy.abGetProperty('password', 'input')
      .type('somePassword')
    cy.abGetProperty('companySize', 'input')
      .click()
      .get('[class$="option"]')
      .first()
      .click()
    cy.abGetProperty('isBig', 'label')
      .click()

    cy.get('button[type="submit"]')
      .click()

    cy.location('pathname')
      .should('eq', '/admin/resources/Company')

    cy.get('td[data-property-name="email"]')
      .contains(data.email)
      .parents('tr')
      .then((parent) => {
        Object.entries(data).forEach(([propertyName, value]) => {
          expect(parent.find(`[data-property-name="${propertyName}"]`))
            .to.have.text(value)
        })
        expect(parent.find('[data-property-name="isBig"]'))
          .to.have.text('Ja')
      })
  })
})
