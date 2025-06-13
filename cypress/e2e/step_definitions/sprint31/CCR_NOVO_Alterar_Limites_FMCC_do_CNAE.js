import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { manterLimtesEFMCCDoCNAEElements as el } from '@pages/Tabelas/Manter_Limites_e_FMCC_do_CNAE.js';

//CT01: Validar alteração do nome da funcionalidade para “Manter limites e FMCC do CNAE”

Dado('que o usuário esteja na funcionalidade manter limites e FMCC do CNAE CT01', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});

Quando('selecionar um CNAE existente CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get('tbody input[type="checkbox"]').eq(0).click({ force: true });
  });
});

Quando('acionar o botão “Alterar Limites” CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoAlterarLimites).click();
  });
}); //CONTINUAR DAQUI

Quando('alterar os valores de limite permitidos CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});

Quando('acionar o botão Salvar CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});

Entao('o sistema deve registrar a alteração dos limites para o CNAE selecionado CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.contains('Manter Limites e FMCC do CNAE');
  });
});

Entao('exibir mensagem de sucesso correspondente CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.contains('Manter Limites e FMCC do CNAE');
  });
});