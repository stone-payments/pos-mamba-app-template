/// <reference types="cypress" />

type splitOperations = string[];

context('basic', () => {
  beforeEach(() => {
    cy.viewport(480, 800);
    cy.visit('/');
  });
});
