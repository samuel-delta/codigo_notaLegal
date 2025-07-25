import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';


// CT01 - Consultar indicações de bens para IPTU/IPVA
Dado('que o usuário esteja logado no ReceitaWeb CONSULTARINDICACAO_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Indicação para IPTU IPVA pelo FISCO" CONSULTARINDICACAO_CT01', () => {
  cy.acessarContaCorrente('Indicação para IPTU/IPVA pelo Fisco');
});

Quando('informar os parâmetros obrigatórios da consulta CONSULTARINDICACAO_CT01', () => {
  cy.preencherCpfCnpj('82016909153');
});

Quando('acionar o botão Consultar CONSULTARINDICACAO_CT01', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados CONSULTARINDICACAO_CT01', () => {
  cy.capturarValidarGrid();
});

// CT02 - Consulta sem parâmetros obrigatórios
Quando('não informar os parâmetros obrigatórios da consulta CONSULTARINDICACAO_CT02', () => {
  cy.limparCpfCnpj();
  });

Quando('acionar o botão Consultar CONSULTARINDICACAO_CT02', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." CONSULTARINDICACAO_CT02', () => {
  cy.validarMensagemCampoObrigatorio();
});

// CT03 - Exportar todos os dados da consulta
Quando('o usuário realizar uma consulta válida CONSULTARINDICACAO_CT03', () => {
    cy.preencherCpfCnpj('63484757191 01060061180 83579907115');
    cy.selecionarOperador('Lista');
    cy.clicarBotaoConsultar();
    
});

Quando('acionar a opção Exportar sem selecionar nenhum registro CONSULTARINDICACAO_CT03', () => {
  cy.esperar(3000);
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados CONSULTARINDICACAO_CT03', () => {
  cy.validarExportacaoComDadosDaGrid(['.xlsx', '.txt', '.pdf']);
  cy.task('limparDownloads');
  
});

//CT04 - Exportar apenas os registros selecionado
Quando('o usuário realizar uma consulta válida CONSULTARINDICACAO_CT04', () => {
    cy.preencherCpfCnpj('82016909153 63484757191');
    cy.selecionarOperador('Lista');
    cy.clicarBotaoConsultar();
});

Quando('que o usuário tenha selecionado registros da listagem CONSULTARINDICACAO_CT04', () => {
  cy.selecionar1CapturarDadoGrid();
});

Quando('acionar a opção Exportar CONSULTARINDICACAO_CT04', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados CONSULTARINDICACAO_CT04', () => {
  cy.validarLinhaSelecionadaNosArquivos();
  cy.task('limparDownloads'); 
  
});

// CT05 - Extração de dados Excel e TXT (FAZER A CONSULTA, VALIDAR DADOS E ENTRAR NA EXTRAÇÃO DE DADOS)
Quando('o usuario acessar o botão Extração de Dados CONSULTARINDICACAO_CT05', () => {
  cy.botaoExtracaoDeDados();
});

Quando('preencher os parâmetros da extração CONSULTARINDICACAO_CT05', () => {
  cy.preencherCpfCnpjExtracao('82016909153');
});

Quando('acionar a opção Exportar nos formatos Excel e TXT CONSULTARINDICACAO_CT05', () => {
  cy.exportarArquivos(['Excel', 'TXT']);
});


Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados CONSULTARINDICACAO_CT05', () => {
  cy.validarArquivosExtracao('82016909153');
  cy.validarArquivosExtracao('91232');
  cy.task('limparDownloads');
});
