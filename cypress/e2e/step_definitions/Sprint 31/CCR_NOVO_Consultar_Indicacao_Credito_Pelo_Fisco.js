import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { depositoBancarioIndicacaoElements as el } from '@pages/Conta_Corrente/Deposito_Bancario_Indicacao_Pelo_Fisco';

//CT01: Indicar depósito bancário pelo Fisco 

Dado('que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT01.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('informar os parâmetros obrigatórios da consulta CT01.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputSeqBeneficiario).type('0');
    cy.get(el.droprollDeIgualdade).click();
    cy.get(el.droprollOpcaoMaiorQue).click();
  });
});

Quando('acionar o botão Consultar CT01.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deve exibir a listagem de depósitos bancários indicados pelo Fisco de acordo com os parâmetros informados CT01.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.get(el.tabelaDepositoBancario).should('be.visible');
  });
});


//CT02: Consultar sem preencher campos obrigatórios

Dado('que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT02.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('não informar os parâmetros obrigatórios da consulta CT02.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Setep em branco
  });
});

Quando('acionar o botão Consultar CT02.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema exibe a msg2 “Pelo menos um campo deve ser preenchido.” CT02.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido.');
  });
});

//CT03: Exportar todos os registros da consulta

Dado('que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT03.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Dado('tenha feito uma consulta válida CT03.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputSeqBeneficiario).type('0');
    cy.get(el.droprollDeIgualdade).click();
    cy.get(el.droprollOpcaoMaiorQue).click();

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

Quando('acionar a opção exportar sem selecionar nenhum registro CT3.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Tem muitos dados e fica impossivel a demora para carregar, 
    //assim, eu fiz ele selecionar os 10 primeros
    
    for (let i = 0; i < 10; i++) {
      cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
      cy.wait(300);
    }

    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist')
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist')
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.readFile('cypress/downloads/DepositoBancarioIndicacaoFisco.pdf', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema exporta todos os dados recuperados na consulta contendo os formatos TXT, PDF e Excel CT03.1', () => {
 
  const dadosEsperadosOriginais = Cypress.env('dadosTabelaExtraidos');

  //Coloca pessoa físca como '1' e juridica como '2'
  function mapearCampo(campo) {
    if (typeof campo === 'string') {
      if (campo.toLowerCase() === 'física') return '1';
      if (campo.toLowerCase() === 'jurídica') return '2';
    }
    return campo;
  }

  const dadosEsperadosMapeados = Array.isArray(dadosEsperadosOriginais[0])
    ? dadosEsperadosOriginais.map(linha => linha.map(mapearCampo))
    : dadosEsperadosOriginais.map(mapearCampo);

  cy.validarArquivosExportados(
    'cypress/downloads/DepositoBancarioIndicacaoFisco.txt', 
    'cypress/downloads/DepositoBancarioIndicacaoFisco.pdf',
    'cypress/downloads/DepositoBancarioIndicacaoFisco.xlsx',
  dadosEsperadosMapeados
  );

});



//CT04: Exportar registros selecionados

Dado('que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT04.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Dado('tenha feito uma consulta válida CT04.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputSeqBeneficiario).type('0');
    cy.get(el.droprollDeIgualdade).click();
    cy.get(el.droprollOpcaoMaiorQue).click();
    cy.get(el.botaoConsultar).click();
  });
});

Quando('selecionado registros da listagem CT04.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Seleciona os dois primeiros:
    for (let i = 0; i < 2; i++) {
      cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
      cy.wait(300);
    }

  //Salva os dois valores iniciais:
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

Quando('selecionar a opção Exportar CT04.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {

  cy.get(el.botaoExportar).click();
  cy.get(el.botaoOpcaoExportarTXT).click();
  cy.get(el.load, { timeout: 10000 }).should('not.exist')
  cy.get(el.botaoExportar).click();
  cy.get(el.botaoOpcaoExportarExcel).click();
  cy.get(el.load, { timeout: 10000 }).should('not.exist')
  cy.get(el.botaoExportar).click();
  cy.get(el.botaoOpcaoExportarPDF).click();
  cy.readFile('cypress/downloads/DepositoBancarioIndicacaoFisco.pdf', { timeout: 15000 }).should('exist');

  })
});

Entao('o sistema exporta todos os dados recuperados na consulta contendo os formatos TXT, PDF e Excel CT04.1', () => {

  const dadosEsperadosOriginais = Cypress.env('dadosTabelaExtraidos');

  //Coloca pessoa físca como '1' e juridica como '2'
  function mapearCampo(campo) {
    if (typeof campo === 'string') {
      if (campo.toLowerCase() === 'física') return '1';
      if (campo.toLowerCase() === 'jurídica') return '2';
    }
    return campo;
  }

  const dadosEsperadosMapeados = Array.isArray(dadosEsperadosOriginais[0])
    ? dadosEsperadosOriginais.map(linha => linha.map(mapearCampo))
    : dadosEsperadosOriginais.map(mapearCampo);

  cy.validarArquivosExportados(
    'cypress/downloads/DepositoBancarioIndicacaoFisco.txt', 
    'cypress/downloads/DepositoBancarioIndicacaoFisco.pdf',
    'cypress/downloads/DepositoBancarioIndicacaoFisco.xlsx',
  dadosEsperadosMapeados
  );

});

//CT05: Realizar extração de dados nos formatos Excel e TXT 

Dado('que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT05.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('acionar o botão Extração de Dados CT05.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExtracaoDeDados).click();
  });
});

Quando('preencher os parâmetros da extração CT05.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputExtracaoCpf).eq(1).type('82016909153');
  });
});

Quando('selecionar a opção Exportar CT05.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.get(el.botaoExportar).click();
  cy.get(el.botaoOpcaoExportarTXT).click();
  cy.get(el.load, { timeout: 10000 }).should('not.exist')
  cy.get(el.botaoExportar).click();
  cy.get(el.botaoOpcaoExportarExcel).click();
  cy.readFile('cypress/downloads/DepositoBancarioIndicacaoFisco.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema apresenta o arquivo de acordo com a seleção realizada CT05.1', () => {
  cy.task('readTXT', 'cypress/downloads/DepositoBancarioIndicacaoFisco.txt').then((txt) => {
  expect(txt).to.include('82016909153');
  });
  cy.task('readExcel', 'cypress/downloads/DepositoBancarioIndicacaoFisco.xlsx').then((txt) => {
  const textoCompleto = txt.flat().join(' ');
  expect(textoCompleto).to.include('82016909153');
  });
  cy.task('deleteDownloads');
});
