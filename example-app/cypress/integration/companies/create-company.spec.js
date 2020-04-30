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

  it('show translated select labels and button', () => {
    cy.get('[data-testid="property-edit-companySize"] input').click()
    cy.get('[data-testid="property-edit-companySize"] [class$="option"]')
      .then((options) => {
        expect(
          options.map((k, option) => cy.$$(option).text()).toArray(),
        ).to.have.members(['superBig', 's', 't'])
      })
    cy.get('[data-testid="property-edit-tags"] button').should('have.text', 'Add new Tag')
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

  it('creates new record and print it with translated properties', () => {
    const data = {
      email: 'test@test.com',
      companyName: 'some company',
      address: 'some address',
      companySize: 'superBig',
    }

    cy.get('#email').type(data.email)
    cy.get('#companyName').type(data.companyName)
    cy.get('#address').type(data.address)
    cy.get('#password').type('somePassword')

    cy.get('[data-testid="property-edit-companySize"] input').click()
    cy.get('[data-testid="property-edit-companySize"] [class$="option"]').first().click()

    cy.get('[data-testid="property-edit-isBig"] label').click()

    cy.get('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/admin/resources/Company')

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
