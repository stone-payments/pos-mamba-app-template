/// <reference types="cypress" />
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@cypress/code-coverage/support';
import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
      getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*="${selector}"]`, ...args);
});
