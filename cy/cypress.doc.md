### Cypress helpers

This module gathers helpers which can be used when you E2E test your AdminJS dashboard with
{@link https://www.cypress.io/} as we do.

### Usage

First, you have to import helpers to your cypress project. You can do this in:

`/support/index.js` or `/support/commands.js`
```javascript
require('adminjs/cy')
```

and now you can use our helpers

```javascript
/// <reference types="cypress" />
/// <reference types="adminjs/cy" />

context('resources/Company/actions/new', () => {
  before(() => {
    cy.abLoginAPI({ password: Cypress.env('ADMIN_PASSWORD'), email: Cypress.env('ADMIN_EMAIL') })
  })

  beforeEach(() => {
    cy.abKeepLoggedIn({ cookie: Cypress.env('COOKIE_NAME') })
    cy.visit('resources/Company/actions/new')
  })

  //...
})
```

### What we have

Cypress helpers project is currently in the WIP/POC phase, that is why there are not much helpers
here. But you can expect that gradually we will add more.