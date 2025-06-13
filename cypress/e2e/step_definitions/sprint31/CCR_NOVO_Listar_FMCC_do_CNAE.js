import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { manterLimtesEFMCCDoCNAEElements as el } from '@pages/Tabelas/Manter_Limites_e_FMCC_do_CNAE.js';

//CT01: Validar alteração do nome da funcionalidade para “Manter limites e FMCC do CNAE”

Dado('que o usuário acesse o sistema', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});

Quando('navegar até a funcionalidade correspondente', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});


Entao('o sistema deve exibir o nome “Manter limites e FMCC do CNAE” no título da tela', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.contains('Manter Limites e FMCC do CNAE');
  });
});

//CT02: Exibir Colunas de Limites Diário e Mensal

Dado('que o usuário acesse a funcionalidade: Manter limites e FMCC do CNAE CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});

Quando('visualizar a lista de CNAEs cadastrados CT02', () => {
    //Step em branco
});


Entao('o sistema exibe as colunas: Limite Diário e Limite Mensal CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.get(el.tabelaManterLimites).should('be.visible');
  });
});

//CT03: Visualizar Botão Alterar Limites

Dado('que o usuário acesse a funcionalidade: Manter limites e FMCC do CNAE CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});

Quando('localizar um registro de CNAE CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get('tbody input[type="checkbox"]').eq(0).click({ force: true });
  });
});


Entao('o sistema exibe o botão: Alterar Limites CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.get(el.botaoAlterarLimites).should('not.be.disabled');
  });
});

