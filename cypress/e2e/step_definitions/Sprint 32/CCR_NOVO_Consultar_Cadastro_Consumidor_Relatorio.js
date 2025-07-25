import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const periodoFiltro = '06/2025';
// Datas que devem aparecer nos arquivos exportados
const dadosEsperadosExportacao = ['202506', '202504', '202502'];
const dadosSelecionadosExportacao = ['202506'];

// CT01
Dado('que o usuário esteja logado RELATÓRIO_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Cadastro de Consumidores - Relatório" RELATÓRIO_CT01', () => {
  cy.acessarConsultas('Cadastro de Consumidores - Relatório');
});

Quando('informar os parâmetros obrigatórios da consulta RELATÓRIO_CT01', () => {
  cy.preencherFiltroPeriodoComOperadorMaiorQue(periodoFiltro);
});

Quando('acionar o botão Consultar RELATÓRIO_CT01', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados RELATÓRIO_CT01', () => {
  cy.validarPeriodoNaTabelaMaiorOuIgual(periodoFiltro);
});

// CT02
Quando('não informar os parâmetros obrigatórios da consulta RELATÓRIO_CT02', () => {
  // Se necessário: cy.limparCamposFiltro();
});

Quando('acionar o botão Consultar RELATÓRIO_CT02', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a mensagem {string} RELATÓRIO_CT02', (mensagem) => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { mensagem } }, ({ mensagem }) => {
    cy.contains(mensagem).should('be.visible');
  });
});


// CT03
Dado('que o usuário tenha realizado uma consulta válida RELATÓRIO_CT03', () => {
  cy.preencherFiltroPeriodoComOperadorMaiorQue(periodoFiltro);
  cy.clicarBotaoConsultar();
  
});

Quando('acionar a opção Exportar sem selecionar nenhum registro RELATÓRIO_CT03', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados RELATÓRIO_CT03', () => {
  cy.validarArquivosExportados(dadosEsperadosExportacao); // valida se todos os registros (202506, 202504, 202502) estão nos arquivos
});


// CT04
Dado('que o usuário tenha realizado uma consulta válida RELATÓRIO_CT04', () => {
  cy.preencherFiltroPeriodoComOperadorMaiorQue(periodoFiltro);
  cy.clicarBotaoConsultar();
  cy.validarPeriodoNaTabelaMaiorOuIgual(periodoFiltro);
});

Dado('que o usuário tenha selecionado registros da listagem RELATÓRIO_CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('table tbody tr').first().find('input[type="checkbox"]').check({ force: true });
  });
});

Quando('acionar a opção Exportar RELATÓRIO_CT04', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados RELATÓRIO_CT04', () => {
  cy.validarArquivosExportados(dadosSelecionadosExportacao);
});

// CT05
Dado('que o usuário tenha acessado o menu Extração de Dados da funcionalidade RELATÓRIO_CT05', () => {
  cy.acessarConsultas('Extração de Dados');
});

Quando('preencher os parâmetros da extração RELATÓRIO_CT05', () => {
  cy.preencherFiltroPeriodoExtracao(periodoFiltro);
});

Quando('acionar a opção Exportar nos formatos Excel e TXT RELATÓRIO_CT05', () => {
  cy.exportarArquivos(['Excel', 'TXT']);
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados RELATÓRIO_CT05', () => {
  cy.validarArquivosExportados(dadosSelecionadosExportacao, ['.xlsx', '.txt']);
});
