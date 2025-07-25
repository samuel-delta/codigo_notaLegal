import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';
const dadosEsperados = [
  '25295387',
  '25295388',
  '01213291280',
  '01137093746',
  'Veículo',
  'S',
  'PBX3955',
  'FPC0B74'
];
const dadosEsperados1 = [
  '25295380',
  'Imóvel',
  'S',
  '0012001740',
  ];


// CT01 - Consultar indicações de bens para IPTU/IPVA
Dado('que o usuário esteja logado no ReceitaWeb BEM_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Revisão de Bem pelo Fisco" BEM_CT01', () => {
  cy.acessarContaCorrente('Revisão de Bem pelo Fisco');
});

Quando('informar os parâmetros obrigatórios da consulta BEM_CT01', () => {
  cy.preencherSequencial('25295380');
});

Quando('acionar o botão Consultar BEM_CT01', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados BEM_CT01', () => {
  cy.capturarValidarGrid();
});

// CT02 - Consulta sem parâmetros obrigatórios
Quando('não informar os parâmetros obrigatórios da consulta BEM_CT02', () => {
  cy.limparSequencial();
  });

Quando('acionar o botão Consultar BEM_CT02', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." BEM_CT02', () => {
  cy.validarMensagemCampoObrigatorio();
});

// CT03 - Exportar todos os dados da consulta
Quando('o usuário realizar uma consulta válida BEM_CT03', () => {
    cy.preencherSequencial('25295387 25295388');
    cy.selecionarOperador('Intervalo');
    cy.clicarBotaoConsultar();
    
});

Quando('acionar a opção Exportar sem selecionar nenhum registro BEM_CT03', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados BEM_CT03', () => {
  cy.validarArquivosExportados(dadosEsperados);
  cy.task('limparDownloads');
  
});

//CT04 - Exportar apenas os registros selecionado
Quando('o usuário realizar uma consulta válida BEM_CT04', () => {
    cy.preencherSequencial('25295380 25295382');
    cy.selecionarOperador('Intervalo');
    cy.clicarBotaoConsultar();
});

Quando('que o usuário tenha selecionado registros da listagem BEM_CT04', () => {
  cy.selecionarCheckboxs(1);
});

Quando('acionar a opção Exportar BEM_CT04', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados BEM_CT04', () => {
  cy.validarArquivosExportados(dadosEsperados1);
  cy.task('limparDownloads'); 
  
});

// CT05 - Extração de dados Excel e TXT (FAZER A CONSULTA, VALIDAR DADOS E ENTRAR NA EXTRAÇÃO DE DADOS)
Quando('o usuario acessar o botão Extração de Dados BEM_CT05', () => {
  cy.botaoExtracaoDeDados();
});

Quando('preencher os parâmetros da extração BEM_CT05', () => {
  cy.preencherSequencial('25295380');
});

Quando('acionar a opção Exportar nos formatos Excel e TXT BEM_CT05', () => {
  cy.exportarArquivos(['Excel', 'TXT']);
});


Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados BEM_CT05', () => {
  cy.validarArquivosExtracao('25295380');
  cy.validarArquivosExtracao('Imóvel');
  cy.validarArquivosExtracao('S');
  cy.validarArquivosExtracao('0012001740');
  cy.task('limparDownloads');
});
