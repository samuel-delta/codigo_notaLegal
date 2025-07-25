import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

import { consultarPagamentoElements as el } from '@pages/Sorteio/Consultar_Pagamento.js';

/* ========== CT01: Consultar pagamento ========== */
Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT01.2', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Quando('informar os parâmetros obrigatórios da consulta CT01.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.numeroNota).type('25295380');
  });
});

Quando('acionar o botão Consultar CT01.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados CT01.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.labelNotaFiscal).should('contain', '25295380');
  });
});

/* ========== CT02: Consultar sem preencher campos obrigatórios ========== */
Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT02.2', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Quando('não informar os parâmetros obrigatórios da consulta CT02.2', () => {
  // Intencionalmente vazio
});

Quando('acionar o botão Consultar CT02.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema exibe a msg2: Pelo menos um campo deve ser preenchido. CT02.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.msgCampoObrigatorio).should('contain', 'Pelo menos um campo deve ser preenchido.');
  });
});

/* ========== CT03: Exportar todos os registros da consulta ========== */
Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT03.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Dado('tenha realizado uma consulta válida CT03.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.numeroNota).type('25295380');
    cy.get(el.botaoConsultar).click();
  });
});

Quando('acionar a opção exportar sem selecionar nenhum registro CT03.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.exportarExcel).click();
    cy.get(el.exportarTxt).click();
    cy.get(el.exportarPdf).click();
  });
});

Entao('o sistema exporta todos os dados recuperados na consulta e permite a exportação nos formatos TXT, EXCEL e PDF CT03.1', () => {
  cy.task('findDownloadedFile', 'pdf');
  cy.task('findDownloadedFile', 'txt');
  cy.task('findDownloadedFile', 'xls');
});

/* ========== CT04: Exportar registros selecionados ========== */
Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT4.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Dado('tenha realizado uma consulta válida CT4.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.numeroNota).type('25295380');
    cy.get(el.botaoConsultar).click();
  });
});

Dado('tenha selecionado registros da listagem CT4.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.checkboxSelecionar).eq(0).check();
  });
});

Quando('acionar a opção Exportar CT04.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.exportarExcel).click();
    cy.get(el.exportarTxt).click();
    cy.get(el.exportarPdf).click();
  });
});

Entao('o sistema exporta apenas os registros selecionados na consulta e permite a exportação nos formatos TXT, EXCEL e PDF CT04.1', () => {
  cy.task('findDownloadedFile', 'pdf');
  cy.task('findDownloadedFile', 'txt');
  cy.task('findDownloadedFile', 'xls');
});

/* ========== CT05: Realizar extração de dados nos formatos Excel e TXT ========== */
Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT5.2', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Quando('acionar o botão Extração de Dados CT05.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExtracao).click();
  });
});

Quando('preencher os parâmetros da extração CT05.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.numeroNota).type('25295380');
  });
});

Quando('selecionar a opção Exportar CT05.2', () => {
  // A ação é feita na próxima etapa
});

Quando('escolher os formatos de arquivo EXCEL e/ou TXT CT05.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.exportarExcel).click();
    cy.get(el.exportarTxt).click();
  });
});

Entao('o sistema apresenta o arquivo de acordo com a seleção realizada CT05.2', () => {
  cy.task('findDownloadedFile', 'xls');
  cy.task('findDownloadedFile', 'txt');
});
