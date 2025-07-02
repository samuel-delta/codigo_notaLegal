import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { consultarReclamacoesElements as el } from '@pages/Reclamacoes/Consultar_Reclamacoes.js';

//CT01: Consultar reclamação 

Dado('que o usuário esteja na funcionalidade: Consultar Reclamações CT01', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuReclamacoes).eq(1).click();
    cy.get(el.subMenuConsultarReclamacoes).click();
  });
});

Dado('informar os parâmetros obrigatórios da consulta CT01', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuReclamacoes).eq(1).click();
    cy.get(el.subMenuConsultarReclamacoes).click();
  });
});