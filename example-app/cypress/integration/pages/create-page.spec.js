/// <reference types="cypress" />
/// <reference types="../../support" />

const dateRegex = /^[\d]{4}-[\d]{2}-[\d]{2}$/
const dateTimeRegex = /^[\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}$/

context('resources/Profession/actions/new', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(Cypress.env('COOKIE_NAME'))
    cy.visit('resources/Page/actions/new')
  })

  it('creates new page', () => {
    const data = {
      title: 'Some title',
      content: 'hello world',
      createdDate: '2011-01-01',
      createdDateTime: '2011-01-01 11:00',
    }

    cy.get('[data-testid="property-edit-title"] input').type(data.title)
    cy.get('[data-testid="property-edit-content"] .ql-editor')
      .click()
      .type(data.content)
    cy.get('[data-testid="property-edit-createdDate"] input').type(data.createdDate)
    cy.get('[data-testid="property-edit-createdDate"] > div > div.visible').click()
    cy.get('[data-testid="property-edit-createdDateTime"] input').type(data.createdDateTime)
    cy.get('[data-testid="property-edit-createdDateTime"] > div > div.visible').click()

    cy.get('button[type=submit]').contains('Save').click()

    cy.location('pathname').should('eq', '/admin/resources/Page')

    cy.get('td[data-property-name="title"]')
      .contains(data.title)
      .parents('tr')
      .then((parent) => {
        expect(parent.find('[data-property-name="title"]')).to.have.text(data.title)
        expect(parent.find('[data-property-name="content"]')).to.have.text(`<p>${data.content}<...`)
        expect(parent.find('[data-property-name="createdDate"]').text()).to.match(dateRegex)
        expect(parent.find('[data-property-name="createdDateTime"]').text()).to.match(dateTimeRegex)
      })
  })

  it('shows regular date picker for date property', () => {
    cy.get('[data-testid="property-edit-createdDate"] input').click()
    cy.get('[data-testid="property-edit-createdDate"] .react-datepicker-time__input').should('not.exist')
    cy.get('[data-testid="property-edit-createdDate"] .react-datepicker__day.react-datepicker__day--001')
      .not('.react-datepicker__day--outside-month').click()
    cy.get('[data-testid="property-edit-createdDate"] input').then(($el) => {
      expect($el.val()).to.match(dateRegex)
    })
  })

  it('shows datetime picker for date property', () => {
    cy.get('[data-testid="property-edit-createdDateTime"] input').click()
    cy.get('[data-testid="property-edit-createdDateTime"] .react-datepicker-time__input').should('exist')
    cy.get('[data-testid="property-edit-createdDateTime"] .react-datepicker__day.react-datepicker__day--001')
      .not('.react-datepicker__day--outside-month').click()

    cy.get('[data-testid="property-edit-createdDateTime"] input').then(($el) => {
      expect($el.val()).to.match(dateTimeRegex)
    })
  })
})
