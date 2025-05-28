/// <reference types="cypress" />

Cypress.Commands.add("login_sistema", (usuario, senha) => {
  cy.visit("http://homol.receitaweb.fazenda.df.gov.br/");
  cy.wait(1000);
  cy.get('input[name="Login"]').type(usuario);
  cy.get('input[name="Senha"]').type(senha);
  cy.get('input[id="ctl00_loginTela_btnEntrar"]').click();
  // cy.log("Testando erro");
});

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Cannot read properties of undefined (reading 'split')")) {
    return false; // Ignora o erro e continua o teste
  }
  return true; // Deixa outros erros quebrarem o teste
});