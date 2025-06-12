import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { manterLancamentoFiscoElements as el } from '@pages/Conta_Corrente/Manter_Lancamento_Fisco.js';


//CT01: Consultar lançamento Fisco

Dado('que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT01', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os parâmetros obrigatórios da consulta CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    })
  });

Quando('acionar o botão Consultar CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema exibe a listagem de registros de acordo com os parâmetros informados CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    //Verifca se todas as linhas contem o cpf certo
    cy.get('tbody.p-datatable-tbody tr').each(($tr) => {
        cy.wrap($tr).find('td').eq(1).should('contain.text', '82016909153');
    });
});  
});

//CT02: Consultar sem preencher campos obrigatórios

Dado('que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('não informar os parâmetros obrigatórios da consulta CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    //Deixa em branco
    })
  });

Quando('acionar o botão Consultar CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema exibe a mensagem: Pelo menos um campo deve ser preenchido. CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido');
});  
});

//CT03: Exportar todos os registros da consulta

Dado('que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Dado('tenha realizado uma consulta válida CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    })
  });

Quando('acionar a opção exportar sem selecionar nenhum registro CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist')
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.readFile('cypress/downloads/LancamentoFisco.pdf', { timeout: 15000 }).should('exist');
});  
});

Entao('o sistema exporta todos os dados recuperados na consulta nos formatos PDF, TXT e Excel CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.readFile('cypress/downloads/LancamentoFisco.pdf', { timeout: 15000 }).should('exist');
    cy.readFile('cypress/downloads/LancamentoFisco.xlsx', { timeout: 15000 }).should('exist');
    cy.readFile('cypress/downloads/LancamentoFisco.txt', { timeout: 15000 }).should('exist');
});  
});

//CT04: Exportar registros selecionados

Dado('que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT04', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Dado('tenha realizado uma consulta válida CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    })
  });

Dado('tenha selecionado registros da listagem CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    //Seleciona os dois primeiros
    for (let i = 0; i < 2; i++) {
      cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
      cy.wait(300);
    }

    //Salva o valor dos 2 primeiros dados da tabela 
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
    })
  });


Quando('acionar a opção Exportar CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist')
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.readFile('cypress/downloads/LancamentoFisco.pdf', { timeout: 15000 }).should('exist');
});  
});

Entao('sistema exporta apenas os registros selecionados no formatos PDF, TXT e Excel CT04', () => {
  const dadosEsperadosOriginais = Cypress.env('dadosTabelaExtraidos');

  //Coloca pessoa físca como '1' e juridica como '2'
  function mapearCampo(campo) {
    if (typeof campo === 'string') {
      if (campo.toLowerCase() === 'física') return '1';
      if (campo.toLowerCase() === 'juridica') return '2';
    }
    return campo;
  }

  const dadosEsperadosMapeados = Array.isArray(dadosEsperadosOriginais[0])
    ? dadosEsperadosOriginais.map(linha => linha.map(mapearCampo))
    : dadosEsperadosOriginais.map(mapearCampo);

  cy.validarArquivosExportados(
    'cypress/downloads/LancamentoFisco.txt',
    'cypress/downloads/LancamentoFisco.pdf',
    'cypress/downloads/LancamentoFisco.xlsx',
    dadosEsperadosMapeados
  );
});

//CT05: Realizar extração de dados nos formatos Excel e TXT

Dado('que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT05', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('acionar o botão Extração de Dados CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExtracaoDeDados).click();
    })
  });

Quando('preencher os parâmetros da extração CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputExtracaoCPF).type('82016909153')
  });
  });


Quando('selecionar a opção Exportar escolhendo os formatos TXT e Excel CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExtracaoExtrair).click();
    cy.get(el.botaoOpcaoExportarExcel).click({force: true});
    cy.get(el.botaoOpcaoExportarTXT).click({force: true});
    cy.readFile('cypress/downloads/LancamentoFisco.txt', { timeout: 15000 }).should('exist');

});  
});

Entao('o sistema apresenta o arquivo de acordo com a seleção realizada CT05', () => {
  //Verifica se o CPF está dentro dos arquivos:
  cy.task('readTXT', 'cypress/downloads/LancamentoFisco.txt').then((txt) => {
  expect(txt).to.include('82016909153');
  });
  cy.task('readExcel', 'cypress/downloads/LancamentoFisco.xlsx').then((txt) => {
  const textoCompleto = txt.flat().join(' ');
  expect(textoCompleto).to.include('82016909153');
  });
  cy.task('deleteDownloads');
});
