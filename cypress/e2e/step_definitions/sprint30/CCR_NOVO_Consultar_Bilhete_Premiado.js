import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;



import { consultarBilhetePremiadoElements as el } from '@pages/Sorteio/Consultar_Bilhete_Premiado.js';

//Cenário: CT01: Consultar bilhete premiado
Dado('que o usuário deseja consultar um bilhete premiado estando na tela Consultar Bilhetes Premiado', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarBilhetePremiado).click();
  });
});

Quando('o usuário preenche os parâmetros para consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputNumeroDoSorteio).type('122');
    cy.get(el.inputPremio).type('1');
    cy.get(el.inputValorDoPremio).type('R$ 500.000,00');
  });
});

Quando('clicar no botão Consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deve apresentar os registros de acordo com os parâmetros informados', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.tabelaSorteio, { timeout: 30000 }).should('exist'); //Epera a tabela aparecer 
  });
});