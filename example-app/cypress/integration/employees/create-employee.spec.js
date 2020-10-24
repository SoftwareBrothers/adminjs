/// <reference types="cypress" />
/// <reference types="../../support" />

const select = (selector, value) => {
  cy.get(`${selector} input`).first().click()
  const item = cy.get(`${selector} [class$="option"]`).contains(value)
  item.click()
}

context('resources/Employee/actions/new', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(Cypress.env('COOKIE_NAME'))
    cy.visit('resources/Employee/actions/new')
  })

  it('shows reference for a company', () => {
    cy.get('[data-testid="property-edit-company"] input').click()
    cy.get('[data-testid="property-edit-company"] [class$="option"]')
      .should('have.length', 1)
  })

  it('creates new employee', () => {
    const data = {
      name: 'John doe',
      email: 'john.doe@example.com',
      address: 'Wroclaw, Poland',
      company: Cypress.env('ADMIN_EMAIL'),
      professions: ['vue', 'react'],
    }

    // fill basic data
    cy.get('[data-testid="property-edit-name"] input').type(data.name)
    cy.get('[data-testid="property-edit-email"] input').type(data.email)
    cy.get('[data-testid="property-edit-address"] input').type(data.address)
    select('[data-testid="property-edit-company"]', data.company)

    cy.get('[data-testid="property-edit-professions"] button').last().click()
    select('[data-testid="property-edit-professions.0"]', data.professions[0])
    cy.get('[data-testid="property-edit-professions"] button').last().click()
    select('[data-testid="property-edit-professions.1"]', data.professions[1])

    // checkout the API
    cy.server()
    cy.route({ method: 'POST', url: 'admin/api/resources/Employee/actions/new' })
      .as('apiNew')
    cy.get('button[type="submit"]').click()

    cy.wait('@apiNew').then((xhr) => {
      const { notice, record, redirectUrl } = xhr.response.body
      expect(notice).not.to.be.undefined
      expect(redirectUrl).not.to.be.undefined
      expect(record.params.address).to.eq(data.address)
      expect(record.params.name).to.eq(data.name)
      expect(record.params.email).to.eq(data.email)
      expect(record.params.company).not.to.undefined
      expect(record.params['professions.0']).not.to.undefined
      expect(record.params['professions.1']).not.to.undefined
    })
  })
})
