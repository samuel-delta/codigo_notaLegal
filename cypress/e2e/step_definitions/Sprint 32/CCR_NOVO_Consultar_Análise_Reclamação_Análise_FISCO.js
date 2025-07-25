import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const numeroReclamacao = '659836';
let dadosDaGrid = [];

Dado('que o usuário esteja logado', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade {string} CT001', (funcionalidade) => {
  cy.acessarFuncionalidade(funcionalidade);
});

// CT01: Consulta válida
Quando('informar os parâmetros obrigatórios da consulta CT001', () => {
  cy.preencherReclamacao(numeroReclamacao);
});

Quando('acionar o botão Consultar CT001', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados CT001', () => {
  cy.validarGridComNumero(numeroReclamacao);
});

// CT02: Consulta sem parâmetros obrigatórios
Quando('não informar os parâmetros obrigatórios da consulta CT001', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('#reclamacao').clear({ force: true });
  });
});

Entao('o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." CT001', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.contains('Pelo menos um campo deve ser preenchido.').should('be.visible');
  });
});

// CT03: Exportar todos os registros
Dado('que o usuário tenha realizado uma consulta valida CT001', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('span').contains(/^Reclamações$/).parents('a').click();
    cy.contains('span', 'Manter Análise da Reclamação').click();

    cy.get('#reclamacao').clear({ force: true }).type('0', { force: true });
    cy.get('#pn_id_18 > .p-dropdown-trigger').click();
    cy.get('li[role="option"][aria-posinset="3"]').first().click();
    cy.get('span.p-button-label').contains('Consultar').click();

    cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0).then(rows => {
      dadosDaGrid = [];
      rows.each((_, row) => {
        const texto = Cypress.$(row).text().trim().replace(/\s+/g, ' ');
        dadosDaGrid.push(texto);
      });
    });
  });
});

Quando('acionar a opção Exportar sem selecionar nenhum registro CT001', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados CT001', () => {
  cy.validarArquivosExportados(dadosDaGrid);
  cy.task('limparDownloads');
});

// CT04: Exportar registros selecionados
Dado('que o usuário tenha realizado uma consulta válida com número de reclamação específico CT004', () => {
  cy.task('limparDownloads');
  cy.acessarFuncionalidade('Manter Análise da Reclamação');
  cy.preencherReclamacao(numeroReclamacao);
  cy.clicarBotaoConsultar();

  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('table tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0).first().then(row => {
      const texto = Cypress.$(row).text().trim().replace(/\s+/g, ' ');
      dadosDaGrid = [texto];
    });
  });
});

Dado('que o usuário tenha selecionado registros da listagem CT004', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('.p-checkbox-box').click();
    });
  });
});

Quando('acionar a opção Exportar CT004', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta apenas os registros selecionados e valida os dados dos arquivos exportados CT004', () => {
  cy.validarArquivosExportados(dadosDaGrid);
  cy.task('limparDownloads');
});

// CT05: Extração de dados Excel e TXT
Dado('que o usuário tenha acessado o menu Extração de Dados da funcionalidade CT005', () => {
  cy.task('limparDownloads');
  cy.loginReceitaWeb();
  cy.acessarFuncionalidade('Manter Análise da Reclamação');

  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.contains('span.p-button-label', 'Extração de Dados', { timeout: 10000 }).should('be.visible').click();
  });
});

Quando('preencher os parâmetros da extração CT005', () => {
  cy.preencherReclamacao(numeroReclamacao);
});

Quando('acionar a opção Exportar nos formatos Excel e TXT CT005', () => {
  cy.exportarArquivos(['Excel', 'TXT']);
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados CT005', () => {
  const tipos = ['.xlsx', '.txt'];
  const downloadsFolder = Cypress.config('downloadsFolder');

  tipos.forEach((ext) => {
    cy.task('findDownloadedFile', { folder: downloadsFolder, extension: ext }).then((fileName) => {
      const filePath = `${downloadsFolder}/${fileName}`;

      if (ext === '.xlsx') {
        cy.task('readExcel', filePath).then((rows) => {
          const conteudo = rows.flat().join(' ').replace(/\s+/g, ' ');
          expect(conteudo).to.include(numeroReclamacao);
        });
      }

      if (ext === '.txt') {
        cy.task('readTXT', filePath).then((text) => {
          const textoFormatado = text.replace(/\s+/g, ' ');
          expect(textoFormatado).to.include(numeroReclamacao);
        });
      }
    });
  });

  cy.task('limparDownloads');
});
