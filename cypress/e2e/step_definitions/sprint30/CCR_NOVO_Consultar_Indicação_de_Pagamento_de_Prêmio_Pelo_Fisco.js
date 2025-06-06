import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { indicarPagamentoPremioPeloFiscoElements as el } from '@pages/Sorteio/Indicar_Pagamento_de_Premio_Pelo_Fisco.js';

//CT01: Consultar Indicação de Pagamento de Prêmio pelo Fisco

Dado('que o usuário tenha acessado o sistema CCR', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});

Dado('que o usuário tenha acessado a funcionalidade Sorteio → Indicar Pagamento de Prêmio pelo Fisco', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
  });
});

Dado('que o usuário informe os parâmetros necessários para consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('820.169.091-53');
  });
});

Quando('o usuário acionar a opção “Consultar”', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deverá exibir a listagem de registros de acordo com os parâmetros informados', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.tabelaSorteio).first().find('td').eq(3).should('contain.text', '82016909153');
  });
});

//CT02: Consultar sem preencher campos obrigatórios

Dado('que o usuário tenha acessado o sistema CCR CT02.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});

Dado('que o usuário tenha acessado a funcionalidade Sorteio → Indicar Pagamento de Prêmio pelo Fisco CT02.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
  });
});

Dado('que o usuário não informe nenhum parâmetro obrigatório CT02.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Sem Parâmetro
  });
});

Quando('o usuário acionar a opção “Consultar” CT02.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deverá exibir a mensagem MSG2: Pelo menos um campo deve ser preenchido CT02.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido');
  });
});

//CT03: Exportar todos os registros da consulta

Dado('que o usuário tenha realizado uma consulta válida e obtido resultados CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
    cy.get(el.inputCPF).type('820.169.091-53');
    cy.get(el.botaoConsultar).click();
  });
});

Quando('o usuário acionar a opção Exportar sem selecionar nenhum registro CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist'); //Espera load sumir para seguir
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist');
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/IndicarPagamentoFisco.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema deverá exportar todos os dados recuperados na consulta CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.readFile('cypress/downloads/IndicarPagamentoFisco.xlsx', { timeout: 15000 }).should('exist');
    cy.readFile('cypress/downloads/IndicarPagamentoFisco.pdf', { timeout: 15000 }).should('exist');
    cy.readFile('cypress/downloads/IndicarPagamentoFisco.txt', { timeout: 15000 }).should('exist');
  });
});


//CT04: Exportar registros selecionados

Dado('que o usuário tenha realizado uma consulta válida e obtido resultados CT04', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
    cy.get(el.inputCPF).type('820.169.091-53');
    cy.get(el.botaoConsultar).click();
  });
});

Dado('que o usuário tenha selecionado alguns registros da listagem CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    
    //Seleciona os 2 primeiros
    for (let i = 0; i < 2; i++) {
        cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
        cy.wait(300);
    }
    
    //Salva os 2 primeiros dados na tabela para checar no Entao
    const dadosTabela = [];

    cy.get('tbody tr').each(($row, index) => {
      if (index < 2) { 
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

Quando('o usuário acionar a opção Exportar CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist'); 
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist');
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/IndicarPagamentoFisco.xlsx', { timeout: 15000 }).should('exist');
  });
});


Entao('o sistema deverá exportar apenas os registros selecionados nos formatos TXT, PDF e Excel CT04', () => {
  const dadosEsperados = Cypress.env('dadosTabelaExtraidos');

  cy.validarArquivosExportados(
    'cypress/downloads/IndicarPagamentoFisco.txt',
    'cypress/downloads/IndicarPagamentoFisco.pdf',
    'cypress/downloads/IndicarPagamentoFisco.xlsx',
  dadosEsperados
  );

  cy.task('deleteDownloads'); // Deleta os arquivos dentro da pasta download
});


//CT05: Extração de dados [Excel e TXT] 

Dado('que o usuário deseja extrair os dados da consulta em TXT e EXCEL CT05', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
  });
});

Quando('o usuário selecionar o botão Extração de Dados CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExtracaoDeDados).click();
  });
});

Quando('preencher os parâmetros CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPFNoExtracaoDeDados).type('820.169.091-53');
  });
});

Quando('clicar no botao exportar escolhendo a opção de arquivo TXT e Excel CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.wait(5000);
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/IndicarPagamentoFisco.xlsx', { timeout: 15000 }).should('exist')
  });
});

Entao('o sistema apresenta o arquivo de acordo com o selecionado CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.task('readTXT', 'cypress/downloads/IndicarPagamentoFisco.txt').then((txt) => {
  expect(txt).to.include('82016909153');
  expect(txt).to.include('2343365');
  });
  cy.task('readExcel', 'cypress/downloads/IndicarPagamentoFisco.xlsx').then((txt) => {
  const textoCompleto = txt.flat().join(' ');
  expect(textoCompleto).to.include('82016909153');
  expect(textoCompleto).to.include('2111597');
  });
  cy.task('deleteDownloads');
  });
});
