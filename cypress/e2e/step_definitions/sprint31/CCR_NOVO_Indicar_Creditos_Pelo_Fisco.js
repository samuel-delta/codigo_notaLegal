import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { depositoBancarioIndicacaoElements as el } from '@pages/Conta_Corrente/Deposito_Bancario_Indicacao_Pelo_Fisco';

//CT01: Indicar depósito bancário pelo Fisco 
Dado('que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('selecionar um ou mais registros de depósito bancário', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputSeqBeneficiario).type('0');
    cy.get(el.droprollDeIgualdade).click();
    cy.get(el.droprollOpcaoMaiorQue).click();
    cy.get(el.botaoConsultar).click();
    //Seleciona os 3 primeiros checkboxes
    cy.get('tbody .p-checkbox-box').then(($checkboxes) => {
     for (let i = 0; i < 3 && i < $checkboxes.length; i++) {
     cy.wrap($checkboxes[i]).click({ force: true });
     }
    });
  });
});

Quando('acionar a opção Indicar', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoIndicar).click();
  });
});

Entao('o sistema deve registrar a indicação dos depósitos selecionados pelo Fisco exibindo a mensagem de sucesso correspondente', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.mensagemDeAvisoDeIndicacao).should('contain.text', 'Para realizar essa ação é necessário selecionar somente um registro na tabela.');
  });
});



//CT02: Indicar depósito bancario sem preencher campos obrigatórios
Dado('que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

