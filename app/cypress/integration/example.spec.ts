context('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows overridden sidebar footer', () => {
    cy.contains('Welcome on Board')
  })
})
