/// <reference types="cypress" />
/// <reference types="../../support" />

context('resources/Taggables/actions/new', () => {
  before(() => {
    cy.login()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce(Cypress.env('COOKIE_NAME'))
    cy.visit('resources/Taggables/actions/new')
  })

  describe('create - edit flow', () => {
    const name = 'Taggable name'
    const tags = ['big', 'strong']

    it('creates taggable with 1 tag', () => {
      cy.get('#name').type(name)
      cy.get('[data-testid="property-edit-tags"] button').click()
      cy.get('[id="tags.0"]').type(tags[0])

      cy.get('button[type="submit"]').click()
      cy.location('pathname').should('eq', '/admin/resources/Taggables')

      cy.get('td[data-property-name="name"]').contains(name)
    })

    it('edits previously created record by removing a tag', () => {
      cy.visit('resources/Taggables')

      cy.get('td[data-property-name="name"]').contains(name)
        .parents('tr')
        .click()
        .invoke('data')
        .as('data')

      cy.location().should(function (loc) {
        const url = ['/admin/resources/Taggables/records', this.data.id, 'edit'].join('/')
        expect(loc.href).to.include(url)
      })
      cy.get('[data-testid="delete-item"]').click()

      cy.get('button[type="submit"]').click()

      cy.location('pathname').should('eq', '/admin/resources/Taggables').then(function () {
        cy.get(`[data-id="${this.data.id}"] [data-property-name="tags"]`).should('have.text', 'length: 0')
      })
    })

    it('deletes the record', () => {
      cy.visit('resources/Taggables')

      cy.get('td[data-property-name="name"]').contains(name).parents('tr')
        .find('[data-testid="actions-dropdown"]')
        .trigger('mouseover')
      cy.get('td[data-property-name="name"]').contains(name).parents('tr')
        .find('[data-testid="action-delete"]')
        .click()

      cy.get('td[data-property-name="name"]').should('not.exist')
    })
  })
})
