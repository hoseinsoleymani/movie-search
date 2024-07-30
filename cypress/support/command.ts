import '@testing-library/cypress/add-commands';
import '@dom-assertions/cypress-dom';

export const CYPRESS_BASE_URL = 'http://127.0.0.1:5173';

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.get("input[placeholder = 'username']").type('Admin');
  cy.get("input[placeholder = 'password']").type('admin1234');
  cy.findByRole('button', { name: 'Login' }).click();

  cy.intercept('POST', `${CYPRESS_BASE_URL}/api/login`, (req) => {
    return req.reply({
      headers: {
        'Set-Cookie': 'newUserName=Peter Pan;',
      },
      statusCode: 201,
      body: {
        username: 'Admin',
        password: 'admin1234',
      },
      delay: 10,
    });
  }).as('login');

  cy.wait('@login').then(() => {
    cy.visit('/');
  });
});
