import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';
const dadosEsperados = [
  '659836',
  '401',
  'Dados da reclamação conferem (ICMS)',
  'NOTA FISCAL',
  '20110628',
  '199,9',
  '38003984000137',
  'PIAZUMA MATERIAIS PARA CONSTRUCAO LTDA',
  '56484518149',
  'washington torres de oliveira',
  '300',
  'Em análise pelo Fisco',
  '20110815',
  'NÃO'
  
];


// CT01 - Consulta com número válido
Dado('que o usuário esteja logado no ReceitaWeb FISCO_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Manter Análise da Reclamação" FISCO_CT01', () => {
  cy.acessarReclamacao('Manter Análise da Reclamação');
});

Quando('informar os parâmetros obrigatórios da consulta FISCO_CT01', () => {
  cy.preencherReclamacao('659836');
});

Quando('acionar o botão Consultar FISCO_CT01', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados FISCO_CT01', () => {
  cy.capturarValidarGrid();
});

// CT02 - Consulta sem parâmetros
Quando('não informar os parâmetros obrigatórios da consulta FISCO_CT02', () => {
  cy.limparReclamacao();
  });

Quando('acionar o botão Consultar FISCO_CT02', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." FISCO_CT02', () => {
  cy.validarMensagemCampoObrigatorio();
});

// CT03
Quando('o usuário realizar uma consulta válida FISCO_CT03', () => {
    cy.preencherReclamacao('659836');
    cy.clicarBotaoConsultar();
});

Quando('acionar a opção Exportar sem selecionar nenhum registro FISCO_CT03', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados FISCO_CT03', () => {
  cy.validarArquivosExportados(dadosEsperados);
  
  
});

//CT04
Quando('o usuário realizar uma consulta válida FISCO_CT04', () => {
    cy.preencherReclamacao('659836');
    cy.clicarBotaoConsultar();
});

Quando('que o usuário tenha selecionado registros da listagem FISCO_CT04', () => {
  cy.selecionar1CapturarDadoGrid();
});

Quando('acionar a opção Exportar FISCO_CT04', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados FISCO_CT04', () => {
  cy.validarArquivosExportados(dadosEsperados); 
  cy.task('limparDownloads');
});

// CT05
Quando('o usuario acessar o botão Extração de Dados FISCO_CT05', () => {
  cy.botaoExtracaoDeDados();
});

Quando('preencher os parâmetros da extração FISCO_CT05', () => {
  cy.preencherReclamacaoExtracao('659836');
  });

Quando('acionar a opção Exportar nos formatos Excel e TXT FISCO_CT05', () => {
  cy.exportarArquivos(['Excel', 'TXT']);
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados FISCO_CT05', () => {
  cy.validarArquivosExtracao('659836');
  cy.validarArquivosExtracao('199,9');
  cy.validarArquivosExtracao('56484518149');
  cy.validarArquivosExtracao('washington torres de oliveira');
  cy.task('limparDownloads');
});
