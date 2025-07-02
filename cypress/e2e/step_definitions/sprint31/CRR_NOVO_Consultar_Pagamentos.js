import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { consultarPagamentoElements as el } from '@pages/Sorteio/Consultar_Pagamento.js';

//CT01: Consultar Pagamento

Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT01.2', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2', { timeout: 20000 }).click();
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Quando('informar os parâmetros obrigatórios da consulta CT01.2', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('82016909153');
  });
});

Quando('acionar o botão Consultar CT01.2', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
        cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados CT01.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    
    cy.get(el.tabelaDeConsultarPagamento, { timeout: 20000 }).should('be.visible');

    // Encontra o índice da coluna com o nome "CPF"
    cy.get('thead tr th').then(($ths) => {
      let cpfColumnIndex = -1;

      $ths.each((index, th) => {
        if (Cypress.$(th).text().trim().includes('CPF')) {
          cpfColumnIndex = index;
        }
      });

      expect(cpfColumnIndex).to.be.greaterThan(-1); 

      // Valida todas as linhas da tabela
      cy.get('.p-datatable-tbody > tr').each(($tr) => {
        cy.wrap($tr)
          .find(`td:nth-child(${cpfColumnIndex + 1})`)
          .invoke('text')
          .then((text) => {
            const cpfSomenteNumeros = text.replace(/\D/g, '');
            expect(cpfSomenteNumeros).to.eq('82016909153');
          });
      });
    });
  });
});



//CT02: Consultar sem preencher campos obrigatórios 

Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT02.2', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2', { timeout: 20000 }).click();
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Quando('não informar os parâmetros obrigatórios da consulta CT02.2', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Deixa em branco
  });
});

Quando('acionar o botão Consultar CT02.2', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
        cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema exibe a msg2: Pelo menos um campo deve ser preenchido. CT02.2', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
        cy.contains('Pelo menos um campo deve ser preenchido');
  });
});


//CT03: Exportar todos os registros da consulta

Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT03.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2', { timeout: 20000 }).click();
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Quando('tenha realizado uma consulta válida CT03.1', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
        cy.get(el.inputCPF).type('82016909153');
        cy.get(el.botaoConsultar).click();

          const dadosTabela = [];

    cy.get('tbody tr').each(($row, index) => {
      if (index < 10) { 
        const dadosLinha = [];
        cy.wrap($row).find('td').each(($cell) => {
        const texto = $cell
          .contents()
         .filter(function() {
          return this.nodeType === 3; // Só pega texto puro, ignora spans, divs e labels
          })
         .text()
         .trim();

      if (texto) {
        dadosLinha.push(texto);
      }
      }).then(() => {
        dadosTabela.push(dadosLinha);
      });
      }
      }).then(() => {
        cy.wrap(dadosTabela).as('dadosTabela');
        Cypress.env('dadosTabelaExtraidos', dadosTabela);
      });

  });
});

Quando('acionar a opção exportar sem selecionar nenhum registro CT03.1', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist')
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.readFile('cypress/downloads/ConsultarPagamento.pdf', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema exporta todos os dados recuperados na consulta e permite a exportação nos formatos TXT, EXCEL e PDF CT03.1', () => {
  
  const dadosEsperados = Cypress.env('dadosTabelaExtraidos');

  cy.validarArquivosExportados(
    'cypress/downloads/ConsultarPagamento.txt',
    'cypress/downloads/ConsultarPagamento.pdf',
    'cypress/downloads/ConsultarPagamento.xlsx',
  dadosEsperados
  );

});


//CT04: Exportar registros selecionados

Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT4.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2', { timeout: 20000 }).click();
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Dado('tenha realizado uma consulta válida CT4.1', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('82016909153');
    cy.get(el.botaoConsultar).click();

    const dadosTabela = [];

    cy.get('tbody tr').each(($row, index) => {
      if (index < 3) { 
        const dadosLinha = [];
        cy.wrap($row).find('td').each(($cell) => {
        const texto = $cell
          .contents()
         .filter(function() {
          return this.nodeType === 3; // Só pega texto puro, ignora spans, divs e labels
          })
         .text()
         .trim();

      if (texto) {
        dadosLinha.push(texto);
      }
      }).then(() => {
        dadosTabela.push(dadosLinha);
      });
      }
      }).then(() => {
        cy.wrap(dadosTabela).as('dadosTabela');
        Cypress.env('dadosTabelaExtraidos', dadosTabela);
      });

  });
});

Dado('tenha selecionado registros da listagem CT4.1', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    for (let i = 0; i < 3; i++) {
        cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
        cy.wait(300);
    }
  });
});

Quando('acionar a opção Exportar CT04.1', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist')
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.readFile('cypress/downloads/ConsultarPagamento.pdf', { timeout: 15000 }).should('exist');
  });
});


Entao('o sistema exporta apenas os registros selecionados na consulta e permite a exportação nos formatos TXT, EXCEL e PDF CT04.1', () => {
  
  const dadosEsperados = Cypress.env('dadosTabelaExtraidos');

  cy.validarArquivosExportados(
    'cypress/downloads/ConsultarPagamento.txt',
    'cypress/downloads/ConsultarPagamento.pdf',
    'cypress/downloads/ConsultarPagamento.xlsx',
  dadosEsperados
  );

});


//CT05: Realizar extração de dados nos formatos Excel e TXT

Dado('que o usuário esteja na funcionalidade Consultar Pagamento CT5.2', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2', { timeout: 20000 }).click();
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarPagamento).click();
  });
});

Quando('acionar o botão Extração de Dados CT05.2', () => {
    cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExtracaoDeDados).click();
  });
});

Quando('preencher os parâmetros da extração CT05.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPFExtracaoDeDados).type('82016909153');        
  });
});

Quando('selecionar a opção Exportar CT05.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {

  });
});


Quando('escolher os formatos de arquivo EXCEL e/ou TXT CT05.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {

  });
});

Entao('o sistema apresenta o arquivo de acordo com a seleção realizada CT05.2', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {

  });
});