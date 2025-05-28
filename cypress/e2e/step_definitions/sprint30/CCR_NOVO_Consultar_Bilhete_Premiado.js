import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

// Colocando o normalizarCampo aqui para poder usar no PDF/TXT e Excel lá em baixo
function normalizarCampo(campo) {
  if (campo === undefined || campo === null) return '';
  return String(campo)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/r\$\s?/g, '')
    .replace(/\./g, '')
    .replace(/,00$|\.00$|,0$|\.0$/g, '')
    .replace(/[^\wÀ-ÿ0-9]/g, '')
    .trim();
}

import { consultarBilhetePremiadoElements as el } from '@pages/Sorteio/Consultar_Bilhete_Premiado.js';
//Cenário: CT01: Consultar bilhete premiado
Dado('que o usuário deseja consultar um bilhete premiado estando na tela Consultar Bilhetes Premiado', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarBilhetePremiado).click();
  });
});

Quando('o usuário preenche os parâmetros para consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputNumeroDoSorteio).type('122');
    cy.get(el.inputPremio).type('1');
    cy.get(el.inputValorDoPremio).type('R$ 500.000,00');
  });
});

Quando('clicar no botão Consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deve apresentar os registros de acordo com os parâmetros informados', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.tabelaSorteio, { timeout: 30000 }).should('exist'); //Epera a tabela aparecer 
  });
});


//CT02: Consultar Bilhete Premiado [Campos Obrigatórios]

Dado('que o usuário deseja consultar um bilhete premiado estando na tela Consultar Bilhetes Premiado CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarBilhetePremiado).click();
  });
});

Quando('o usuário NÃO preencher os campos obrigatórios e clicar no botão Consultar CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deve apresentar a mensagem MSG2 “Pelo menos um campo deve ser preenchido" CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido.');
  });
});

//CT03: Exportar relatório de bilhetes premiados [TXT, EXCEL E PDF]
Dado('que o usuário deseja exportar os dados de um bilhete premiado em PDF, EXCEL e TXT, esteja na pagina certa e preencha os campos CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarBilhetePremiado).click();
    cy.get(el.inputNumeroDoSorteio).type('122');
    cy.get(el.botaoConsultar).click();
    cy.get(el.tabelaSorteio, { timeout: 30000 }).should('exist');
  });
});

Quando('selecionar um ou mais registros CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
  //Seleciona os três primeiros
  cy.get('tbody input[type="checkbox"]').then(($checkboxes) => {
    for (let i = 0; i < 3 && i < $checkboxes.length; i++) {
    cy.wrap($checkboxes[i]).click({ force: true });
    }
  });
  });
});

Quando('acionar o botão Exportar selecionando as opções PDF, TXT e EXCEL CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist'); //Espera load sumir para seguir
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist');
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/BilhetePremiado.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema apresenta o arquivo de acordo com os selecionados CT03', () => {
  cy.readFile('cypress/downloads/BilhetePremiado.pdf', { timeout: 15000 }).should('exist');
  cy.readFile('cypress/downloads/BilhetePremiado.txt', { timeout: 15000 }).should('exist');
  cy.readFile('cypress/downloads/BilhetePremiado.xlsx', { timeout: 15000 }).should('exist');
  cy.task('deleteDownloads'); // Deleta os arquivos dentro da pasta download
});

//CT04: Extrair dados [Excel, TXT e PDF]
Dado('que o usuário deseja extrair os dados da consulta TXT, Excel e PDF, esteja na pagina certa e preencha os campos CT04', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarBilhetePremiado).click();
    cy.get(el.inputNumeroDoSorteio).type('122');
    cy.get(el.botaoConsultar).click();
    cy.get(el.tabelaSorteio, { timeout: 30000 }).should('exist');
  });
});

Quando('selecionar um ou mais registros CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
  //Seleciona os três primeiros
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
  });
});

Quando('acionar o botão Exportar selecionando as opções PDF, TXT e EXCEL CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarPDF).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist'); //Espera load sumir para seguir
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarTXT).click();
    cy.get(el.load, { timeout: 10000 }).should('not.exist');
    cy.get(el.botaoExportar).click();
    cy.get(el.botaoOpcaoExportarExcel).click();
    cy.readFile('cypress/downloads/BilhetePremiado.xlsx', { timeout: 15000 }).should('exist');
  });
});

Entao('o sistema apresenta o arquivo com os dados de acordo com os selecionados CT04', () => {
  const dadosEsperados = Cypress.env('dadosTabelaExtraidos');
  
  cy.task('readTXT', 'cypress/downloads/BilhetePremiado.txt').then((txtText) => {
    const textoNormalizado = normalizarCampo(txtText);
  
    dadosEsperados.forEach((linha, linhaIndex) => {
      linha.forEach((campo, campoIndex) => {
        const campoNormalizado = normalizarCampo(campo);
        expect(textoNormalizado, `TXT - Erro na linha ${linhaIndex + 1}, coluna ${campoIndex + 1}: "${campo}"`).to.include(campoNormalizado);
        });
    });
  });

  cy.task('readPDF', 'cypress/downloads/BilhetePremiado.pdf').then((PDFText) => {
    const textoNormalizado = normalizarCampo(PDFText);
  
    dadosEsperados.forEach((linha, linhaIndex) => {
      linha.forEach((campo, campoIndex) => {
        const campoNormalizado = normalizarCampo(campo);
        expect(textoNormalizado, `PDF - Erro na linha ${linhaIndex + 1}, coluna ${campoIndex + 1}: "${campo}"`).to.include(campoNormalizado);
        });
    });
  });

  cy.task('readExcel', 'cypress/downloads/BilhetePremiado.xlsx').then((ExcelText) => {
  const textoExcel = ExcelText.flat().join(' ');
  const textoNormalizado = normalizarCampo(textoExcel);

  dadosEsperados.forEach((linha, linhaIndex) => {
    linha.forEach((campo, campoIndex) => {
      const campoNormalizado = normalizarCampo(campo);
      expect(
        textoNormalizado,
        `Excel - Erro na linha ${linhaIndex + 1}, coluna ${campoIndex + 1}: "${campo}"`
      ).to.include(campoNormalizado);
    });
  });
  });
  
  cy.task('deleteDownloads'); // Deleta os arquivos da pasta download
});


//CT05: Consultar bilhete premiado[Dados invalidos]
Dado('que o usuario deseja consultar um bilhete premiado, estando na tela Cosultar Bilhete Premiado CT05', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuConsultarBilhetePremiado).click();
  });
});

Quando('o usuario preencher os parâmetros para consulta com dados invalidos CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputNumeroDoSorteio).type('100')
    cy.get(el.botaoConsultar).click();
  });
});

Quando('clicar no botão Consultar CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deve apresentar o resultado sem registro CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Nenhum registro encontrado.');
  });
});




