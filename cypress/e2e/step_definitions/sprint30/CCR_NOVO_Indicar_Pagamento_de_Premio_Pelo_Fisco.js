import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;



import { indicarPagamentoPremioPeloFiscoElements as el } from '@pages/Sorteio/Indicar_Pagamento_de_Premio_Pelo_Fisco.js';

//Cenário: CT01: Consultar Desbloqueio de Prêmio

Dado('que o usuário está logado no sistema CCR CT01', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});


Dado('acessa a funcionalidade de indicação de pagamento de prêmio pelo fisco CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
  });
});

Dado('realiza a consulta fornecendo os dados necessários CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('820.169.091-53');
  });
});

Dado('visualiza a listagem de registros disponíveis CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Quando('o usuário selecionar um único registro na listagem CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get('tbody input[type="checkbox"]').eq(0).click({ force: true });
  });
});

Quando('clicar no botão Indicar CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoIndicar).click();
  });
});

Entao('o sistema deve concluir a indicação de pagamento do registro e exibir a mensagem Operação Realizada com sucesso! CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoSalvar).click();
    cy.contains('Operação realizada com sucesso!');
  });
});

//Cenário: CT02: Seleção de múltiplos registros na indicação de pagamento

Dado('que o usuário está logado no sistema CCR CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});


Dado('acessa a funcionalidade de indicação de pagamento de prêmio pelo fisco CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
  });
});

Dado('realiza a consulta fornecendo os dados necessários CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('820.169.091-53');
  });
});

Dado('visualiza a listagem de registros disponíveis CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Quando('o usuário selecionar mais de um único registro na listagem CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Seleciona os 2 primeiros
    for (let i = 0; i < 2; i++) {
        cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
        cy.wait(300);
    }
  });
});

Quando('clicar no botão Indicar CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoIndicar).click();
  });
});

Entao('o sistema não permitirá a indicação de pagamento e exibirá o alerta: Para realizar essa ação é necessário selecionar somente um registro na tabela CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Para realizar essa ação é necessário selecionar somente um registro na tabela.')
  });
});

//Cenário: CT03: Indicação de pagamento sem informação bancária

Dado('que o usuário está logado no sistema CRR CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});


Dado('acessa a funcionalidade de indicação de pagamento de prêmio pelo fisco CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuIndicarPagamentoPremioPeloFisco).click();
  });
});

Dado('realiza a consulta fornecendo os dados necessários CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputValorPremio).type('100');
    cy.get(el.botaoConsultar).click();
  });
});

Dado('visualiza a listagem de registros disponíveis CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.tabelaSorteio, { timeout: 15000 }).should('be.visible');
  });
});

Dado('seleciona um único registro para indicação CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    
  //Seleciona uma conta que não tenha dados bancários
  cy.get(el.tabelaSorteio).each(($row, idx) => {
    const $bancoCell = $row.find('td').eq(7);
    let bancoText = $bancoCell.contents().filter(function() {
    return this.nodeType === 3; 
    }).text().trim();
      cy.log(`Linha ${idx} | Banco: [${bancoText}]`);
      if (!bancoText.replace(/[\s\- ]+/g, '')) {
          cy.log(`-> Vai clicar na linha ${idx}`);
          cy.wrap($row).find('.p-checkbox-box').click({ force: true });
      return false;
      }
    });
  });
});

Quando('o usuário clica no botão Indicar e o sistema identifica que o contribuinte não possui indicação bancária cadastrada CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoIndicar).click();
  });
});

Entao('o sistema não permitirá a indicação de pagamento e exibirá o alerta: Indicação bancária não realizada. CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Indicação bancária não realizada');
  });
});
