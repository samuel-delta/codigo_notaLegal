import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const numeroSorteio = '00221';

//const dadosEsperadosExportacao = ['202506'];


// CT01
Dado('que o usuário esteja logado no ReceitaWeb VISUALIZAR_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Manter Sorteio" VISUALIZAR_CT01', () => {
  cy.acessarSorteio('Manter Sorteio');
});

Quando('informar os parâmetros obrigatórios da consulta VISUALIZAR_CT01', () => {
  cy.preencherNumeroSorteio(numeroSorteio);
  cy.clicarBotaoConsultar();
  cy.selecionar1CapturarDadoGrid();
});

Quando('acionar o botão Visualizar VISUALIZAR_CT01', () => {
  cy.clicarBotaoVisualizar();
});

Entao('o sistema exibe os dados do sorteio selecionado. VISUALIZAR_CT01', () => {
  cy.validarNumeroNaVisualizacao(numeroSorteio);
});

// CT02
Quando('informar os parâmetros obrigatórios da consulta VISUALIZAR_CT02', () => {
  cy.preencherNumeroSorteio('0');
  cy.selecionarOperador('>');
  cy.clicarBotaoConsultar();
});

Quando('selecionar mais de um registro VISUALIZAR_CT02', () => {
  cy.selecionar3CapturarDadosGrid();
  
});

Quando('acionar o botão Visualizar VISUALIZAR_CT02', () => {
  cy.clicarBotaoVisualizar();
});

Entao('o sistema exibe a mensagem "Para realizar essa ação é necessário selecionar somente um registro na tabela." VISUALIZAR_CT02', () => {
  cy.validarMensagemRegistrosDuplicado();

})