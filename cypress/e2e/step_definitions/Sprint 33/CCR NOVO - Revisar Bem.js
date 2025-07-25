import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


// CT01
Dado('que o usuário esteja logado no ReceitaWeb REVISAR_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Revisão de Bem pelo Fisco" REVISAR_CT01', () => {
  cy.acessarContaCorrente('Revisão de Bem pelo Fisco');
});

Quando('informar os parâmetros obrigatórios da consulta REVISAR_CT01', () => {
  cy.preencherSequencial('25295380');
  cy.clicarBotaoConsultar();
  cy.selecionarCheckboxs(1);
});

Quando('acionar o botão Buscar Bem Fisco REVISAR_CT01', () => {
  cy.botaoBuscarFisco();
});

Quando('E acionar o botão Revisar Bem REVISAR_CT01', () => {
  cy.botaoRevisarBem();
});

Entao('o sistema exibe a mensagem de sucesso "Validação de integração com o SITAF realizada com sucesso.". REVISAR_CT01', () => {
  cy.validarMensagemRevisarBem();
});

// CT02
Quando('informar os parâmetros obrigatórios da consulta REVISAR_CT02', () => {
  cy.preencherSequencial('25295380 25295382');
  cy.selecionarOperador('Intervalo');
  cy.clicarBotaoConsultar();
  
});

Quando('selecionar mais de um registro REVISAR_CT02', () => {
  cy.selecionarCheckboxs(2);
  });

Quando('acionar o botão Buscar Bem Fisco REVISAR_CT02', () => {
  cy.botaoBuscarFisco();
});

Entao('o sistema exibe a mensagem "Para realizar essa ação é necessário selecionar somente um registro na tabela." REVISAR_CT02', () => {
  cy.validarMensagemRegistrosDuplicado();

})