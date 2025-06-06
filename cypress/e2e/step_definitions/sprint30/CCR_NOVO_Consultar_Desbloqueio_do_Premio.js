import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;



import { desbloquearPremioElements as el } from '@pages/Sorteio/Desbloquear_Premio.js';

//Cenário: CT01: Consultar Desbloqueio de Prêmio

Dado('que o usuário deseja realizar a consulta de desbloqueio de prêmio do sorteio do programa de concessão de crédito', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
});

Dado('o usuario acessa o sistema CC2', () => {
  cy.get('#CC2').click()
});

Dado('o usuario acessa o menu Sorteio, De sbloquear Premio, Consultar', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuDesbloquearPremio).click();
  });
});

Dado('o usuario informa os parâmetros para a consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('820.169.091-53');
  });
});

Quando('o usuário aciona a opção Consultar', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
    cy.get(el.load, { timeout: 20000 }).should('not.exist'); //Espera Load Sumir
  });
});

Entao('o sistema deve exibir a listagem de registros conforme os parâmetros informados', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
  cy.get(el.tabelaSorteio).each(($linha) => {
  cy.wrap($linha).find('td').eq(1).should('contain.text', '820.169.091-53');
  });
  });
});


//CT02: Consultar Desbloqueio de Prêmio - Campos Obrigatórios Não Preenchidos
Dado('que o usuário deseja realizar a consulta de desbloqueio de prêmio do sorteio do programa de concessão de crédito CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
});

Dado('o usuario acessa o sistema CC2 CT02', () => {
  cy.get('#CC2').click()
});

Dado('o usuario acessa o menu Sorteio, Desbloquear Premio, Consultar CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuDesbloquearPremio).click();
  });
});

Dado('o usuario NÃO informa os parâmetros para a consulta CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {

  });
});

Quando('o usuário aciona a opção Consultar CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
    cy.get(el.load, { timeout: 20000 }).should('not.exist'); //Espera Load Sumir
  });
});

Entao('o sistema deve apresentar a mensagem MSG2 Pelo menos um campo deve ser preenchido. CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido.');
  });
});


//CT03: Exportar Registros Recuperados na Consulta
Dado('que o usuário realizou uma consulta de desbloqueio de prêmio CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click()
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuDesbloquearPremio).click();
  });
});

Dado('o sistema exibiu uma listagem de registros CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type(' 820.169.091-53');
    cy.get(el.botaoConsultar).click();
    cy.get(el.load, { timeout: 20000 }).should('not.exist'); //Espera Load Sumir
  });
});

Quando('o usuário aciona a opção Exportar sem selecionar nenhum registro CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist'); //Espera load sumir para seguir
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist');
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/DesbloquearPremio.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema deve exportar todos os registros recuperados na consulta exibindo a mensagem: Será exportado todos os itens da consulta, ao passar o cursor CT03', () => {
  cy.readFile('cypress/downloads/DesbloquearPremio.pdf', { timeout: 15000 }).should('exist');
  cy.readFile('cypress/downloads/DesbloquearPremio.txt', { timeout: 15000 }).should('exist');
  cy.readFile('cypress/downloads/DesbloquearPremio.xlsx', { timeout: 15000 }).should('exist');
  cy.task('deleteDownloads'); // Deleta os arquivos dentro da pasta download
});


//CT04: Exportar Registros Selecionados na Consulta
Dado('que o usuário realizou uma consulta de desbloqueio de prêmio CT04', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click()
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuDesbloquearPremio).click();
  });
});

Dado('o sistema exibiu uma listagem de registros CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type(' 820.169.091-53');
    cy.get(el.botaoConsultar).click();
    cy.get(el.load, { timeout: 20000 }).should('not.exist'); //Espera Load Sumir
  });
});

Dado('o usuário selecionou alguns registros específicos CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get('tbody input[type="checkbox"]').then(($checkboxes) => {
      for (let i = 0; i < 2 && i < $checkboxes.length; i++) {
      cy.wrap($checkboxes[i]).click({ force: true });
      }
    });
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
  });
  });

  Quando('o usuário aciona a opção Exportar CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.get(el.load, { timeout: 20000 }).should('not.exist'); //Espera load sumir para seguir
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 20000 }).should('not.exist');
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/DesbloquearPremio.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema deve exportar apenas os registros selecionados CT04', () => {
  const dadosEsperados = Cypress.env('dadosTabelaExtraidos');
  cy.validarArquivosExportados(
    'cypress/downloads/DesbloquearPremio.txt',
    'cypress/downloads/DesbloquearPremio.pdf',
    'cypress/downloads/DesbloquearPremio.xlsx',
  dadosEsperados
  );
});