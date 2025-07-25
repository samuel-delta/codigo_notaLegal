import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';

let dadosDaGrid = [];

// CT01 - Consulta com número válido
Dado('que o usuário esteja logado ESTATISTICA_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Estatística do Sorteio" ESTATISTICA_CT01', () => {
  cy.acessarConsultas('Estatística do Sorteio');
});

Quando('informar os parâmetros obrigatórios da consulta ESTATISTICA_CT01', () => {
  cy.preencherNumeroSorteio('00122');
});

Quando('acionar o botão Consultar ESTATISTICA_CT01', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados ESTATISTICA_CT01', () => {
  cy.capturarValidarGrid();
});

// CT02 - Consulta sem parâmetros
Quando('não informar os parâmetros obrigatórios da consulta ESTATISTICA_CT02', () => {
  cy.limparNumeroSorteio();
  });

Quando('acionar o botão Consultar ESTATISTICA_CT02', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." ESTATISTICA_CT02', () => {
  cy.validarMensagemCampoObrigatorio();
});

// CT03
Quando('o usuário realizar uma consulta válida ESTATISTICA_CT03', () => {
    cy.preencherNumeroSorteio('0');
    cy.selecionarOperador('>');
    cy.clicarBotaoConsultar();
});

Quando('acionar a opção Exportar sem selecionar nenhum registro ESTATISTICA_CT03', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados ESTATISTICA_CT03', () => {
  cy.capturarValidarGrid(); 
  cy.task('limparDownloads');
});

//CT04
Quando('o usuário realizar uma consulta válida ESTATISTICA_CT04', () => {
    cy.preencherNumeroSorteio('0');
    cy.selecionarOperador('>');
    cy.clicarBotaoConsultar();
});

Quando('que o usuário tenha selecionado registros da listagem ESTATISTICA_CT04', () => {
  cy.selecionar3CapturarDadosGrid();
});

Quando('acionar a opção Exportar ESTATISTICA_CT04', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados ESTATISTICA_CT04', () => {
  cy.validarSomenteSelecionadosNosArquivos(); 
  cy.task('limparDownloads');
});

// CT05
Quando('o usuario acessar o botão Extração de Dados ESTATISTICA_CT05', () => {
  cy.botaoExtracaoDeDados();
});

Quando('preencher os parâmetros da extração ESTATISTICA_CT05', () => {
  cy.preencherNumeroSorteioExtracao('00122');
});

Quando('acionar a opção Exportar nos formatos Excel e TXT ESTATISTICA_CT05', () => {
  cy.exportarArquivos(['Excel', 'TXT']);
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados ESTATISTICA_CT05', () => {
  cy.validarArquivosExtracao('00122');
  cy.task('limparDownloads');
});
