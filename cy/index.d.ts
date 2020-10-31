/// <reference types="cypress" />

declare namespace Cypress {
  type AbLoginParams = {
    email?: string;
    password?: string;
    loginPath?: string;
  }

  type AbKeepLoggedInParams = {
    cookie?: string;
  }

  interface Chainable<Subject> {
    abLogin(params?: AbLoginParams): Chainable<any>;
    abLoginAPI(params?: AbLoginParams): Chainable<any>;
    abGetProperty(propertyPath: string, selector?: string): Chainable<any>;
    abKeepLoggedIn(params?: AbKeepLoggedInParams): Chainable<any>;
  }
}
