/// <reference types="cypress" />

context('basic', () => {
  beforeEach(() => {
    cy.viewport(480, 800);
    cy.visit('/');
  });
});
