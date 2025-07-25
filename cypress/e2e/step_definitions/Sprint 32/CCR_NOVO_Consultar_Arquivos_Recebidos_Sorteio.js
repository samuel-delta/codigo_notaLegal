import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const numeroSorteio = '00122';
let dadosDaGrid = [];

// CT01
Dado('que o usuário esteja logado SORTEIO_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Validar Arquivo do Sorteio" SORTEIO_CT01', () => {
  cy.acessarSorteio('Validar Arquivo do Sorteio');
});

Quando('informar os parâmetros obrigatórios da consulta SORTEIO_CT01', () => {
  cy.preencherNumeroSorteio(numeroSorteio);
});

Quando('acionar o botão Consultar SORTEIO_CT01', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados SORTEIO_CT01', () => {
  cy.validarGridComNumero(numeroSorteio);
});

// CT02
Quando('não informar os parâmetros obrigatórios da consulta SORTEIO_CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('#numeroSorteio').clear({ force: true });
  });
});

Quando('acionar o botão Consultar SORTEIO_CT02', () => {
  cy.clicarBotaoConsultar();
});

Entao('o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." SORTEIO_CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.contains('Pelo menos um campo deve ser preenchido.').should('be.visible');
  });
});

// CT03
Dado('que o usuário tenha realizado uma consulta válida SORTEIO_CT03', () => {
  cy.task('limparDownloads');
  cy.acessarSorteio('Validar Arquivo do Sorteio');
  cy.preencherNumeroSorteio(numeroSorteio);
  cy.clicarBotaoConsultar();

  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('table tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(rows => {
        dadosDaGrid = [];
        rows.each((_, row) => {
          const texto = Cypress.$(row).text().trim().replace(/\s+/g, ' ');
          dadosDaGrid.push(texto);
        });
      });
  });
});

Quando('acionar a opção Exportar sem selecionar nenhum registro SORTEIO_CT03', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados SORTEIO_CT03', () => {
  cy.validarArquivosExportados(dadosDaGrid);
  cy.task('limparDownloads');
});

// CT04
Dado('que o usuário tenha realizado uma consulta válida com número de sorteio específico SORTEIO_CT04', () => {
  cy.task('limparDownloads');
  cy.acessarSorteio('Validar Arquivo do Sorteio');
  cy.preencherNumeroSorteio(numeroSorteio);
  cy.clicarBotaoConsultar();

  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('table tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .first()
      .then(row => {
        const texto = Cypress.$(row).text().trim().replace(/\s+/g, ' ');
        dadosDaGrid = [texto];
      });
  });
});

Dado('que o usuário tenha selecionado registros da listagem SORTEIO_CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('.p-checkbox-box').click();
    });
  });
});

Quando('acionar a opção Exportar SORTEIO_CT04', () => {
  cy.exportarArquivos();
});

Entao('o sistema exporta apenas os registros selecionados e valida os dados dos arquivos exportados SORTEIO_CT04', () => {
  cy.validarArquivosExportados(dadosDaGrid);
  cy.task('limparDownloads');
});

// CT05 - Extração de dados Excel e TXT
Dado('que o usuário tenha acessado o menu Extração de Dados da funcionalidade SORTEIO_CT05', () => {
  cy.task('limparDownloads');
  cy.loginReceitaWeb();
  cy.acessarSorteio('Validar Arquivo do Sorteio');

  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.contains('span.p-button-label', 'Extração de Dados', { timeout: 10000 })
      .should('be.visible')
      .click();
  });
});

Quando('preencher os parâmetros da extração SORTEIO_CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', () => {
    cy.get('div.p-dialog').within(() => {
      cy.get('#numeroSorteio', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type('00122');
    });
  });
});

Quando('acionar a opção Exportar nos formatos Excel e TXT SORTEIO_CT05', () => {
  cy.exportarArquivos(['Excel', 'TXT']);
});

Entao('o sistema exporta os arquivos e valida os dados dos arquivos exportados SORTEIO_CT05', () => {
  const tipos = ['.xlsx', '.txt'];
  const downloadsFolder = Cypress.config('downloadsFolder');

  tipos.forEach((ext) => {
    cy.task('findDownloadedFile', { folder: downloadsFolder, extension: ext }).then((fileName) => {
      const filePath = `${downloadsFolder}/${fileName}`;

      if (ext === '.xlsx') {
        cy.task('readExcel', filePath).then((rows) => {
          const conteudo = rows.flat().join(' ').replace(/\s+/g, ' ');
          expect(conteudo).to.include('00122');
        });
      }

      if (ext === '.txt') {
        cy.task('readTXT', filePath).then((text) => {
          const textoFormatado = text.replace(/\s+/g, ' ');
          expect(textoFormatado).to.include('00122');
        });
      }
    });
  });

  cy.task('limparDownloads');
});
