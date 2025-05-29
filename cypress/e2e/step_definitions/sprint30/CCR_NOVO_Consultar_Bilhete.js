import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { manterBilheteElements as el } from '@pages/Sorteio/Manter_Bilhete.js';
//Cenário: CT01: Consultar bilhete premiado
Dado('que o usuário deseja consultar o bilhete no sorteio do programa de concessão de credito estando na pagina Manter Bilhete', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuManterBilhete).click();
  });
});

Quando('o usuário preencher os parâmetros para consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('82016909153');
    cy.get(el.inputNumeroDoBilhete).type('4072');
    cy.get(el.inputNumeroDoSorteio).type('00122');
  });
});

Quando('clicar no botão Consultar', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
    cy.get(el.tabelaSorteio, { timeout: 30000 }).should('exist'); //Espera tabela aparecer/carregar
  });
});

Entao('o sistema deve apresentar os registros de acordo com os parâmetros informados.', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.tabelaSorteio).first().find('td').eq(4).should('contain.text', '820.169.091-53');
    cy.get(el.tabelaSorteio).first().find('td').eq(1).should('contain.text', '4072');
    cy.get(el.tabelaSorteio).first().find('td').eq(6).should('contain.text', '00122');
  });
});


//CT02: Consultar Bilhete [Campos Obrigatórios]
Dado('que o usuário deseja consultar o bilhete no sorteio do programa de concessão de credito estando na pagina Manter Bilhete CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuManterBilhete).click();
  });
});

Quando('o usuário não preenche os campos obrigatórios CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
  });
});

Quando('clica no botão Consultar CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deve apresentar a mensagem MSG2 “Pelo menos um campo deve ser preenchido”.', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido.')
  });
});


//CT03: Exportar Histórico [TXT, EXCEL E PDF]
Dado('que o usuário deseja exportar os dados da consulta em PDF, EXCEL E TXT estando na pagina Manter Bilhete CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuManterBilhete).click();
  });
});

Quando('preencher campos obrigatórios CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('82016909153');
    cy.get(el.inputNumeroDoSorteio).type('00122');
  });
});

Quando('aciona o botão Consultar CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
    cy.get(el.tabelaSorteio, { timeout: 30000 }).should('exist'); //Epera a tabela aparecer 
  });
});

Quando('acionar o botão Exportar selecionando as opções “PDF; EXCEL; TXT” CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {

    //Seleciona os três prmeiros
    cy.get('tbody input[type="checkbox"]').then(($checkboxes) => {
      for (let i = 0; i < 3 && i < $checkboxes.length; i++) {
      cy.wrap($checkboxes[i]).click({ force: true });
      }
    });

    //Salva o valor dos 3 primeiros dados da tabela
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

    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist'); //Espera load sumir para seguir
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist');
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/ManterBilhetes.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema apresenta o arquivo com os dados de acordo com os selecionados CT03.1', () => {
  const dadosEsperados = Cypress.env('dadosTabelaExtraidos');

  cy.validarArquivosExportados(
    'cypress/downloads/ManterBilhetes.txt',
    'cypress/downloads/ManterBilhetes.pdf',
    'cypress/downloads/ManterBilhetes.xlsx',
  dadosEsperados
  );
});


//CT04: Extrair dados [Excel e TXT]

Dado('que o usuário deseja extrair os dados da consulta em TXT e EXCEL estando na pagina Manter Bilhete CT04', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuManterBilhete).click();
  });
});

Dado('o usuário selecionar o botão “Extração de Dados” CT04.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExtracaoDeDados).click();
  });
});

Dado('preencher os parâmetros CT04.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPFNoExtracaoDeDados).type('82016909153');
    cy.get(el.inputNumeroDoBilheteNoExtracaoDeDados).type('4072');
    cy.get(el.inputNumeroDoSorteioNoExtracaoDeDados).type('00122');
  });
});

Dado('selecionar a opção “Exportar” selecionando as opções “EXCEL; TXT” CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.wait(5000);
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/ManterBilhetes.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema vai apresentar o arquivo com os dados passados no parametro CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.task('readTXT', 'cypress/downloads/BilhetePremiado.txt').then((txt) => {
  expect(txt).to.include('82016909153');
  expect(txt).to.include('4072');
  expect(txt).to.include('00122');
  });
  cy.task('readExcel', 'cypress/downloads/BilhetePremiado.xlsx').then((txt) => {
  expect(txt).to.include('82016909153');
  expect(txt).to.include('4072');
  expect(txt).to.include('00122');
  });
  });
});