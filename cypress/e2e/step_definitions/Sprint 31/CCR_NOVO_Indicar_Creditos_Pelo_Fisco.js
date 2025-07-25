import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { depositoBancarioIndicacaoElements as el } from '@pages/Conta_Corrente/Deposito_Bancario_Indicacao_Pelo_Fisco';

//CT01: Indicar depósito bancário pelo Fisco 

Dado('que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('selecionar um registro de depósito bancário e acionar Indicar', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputSeqBeneficiario).type('0');
    cy.get(el.droprollDeIgualdade).click();
    cy.get(el.droprollOpcaoMaiorQue).click();
    cy.get(el.botaoConsultar).click();
    //Seleciona os 3 primeiros checkboxes
    cy.get('tbody .p-checkbox-box').then(($checkboxes) => {
     for (let i = 0; i < 1 && i < $checkboxes.length; i++) {
     cy.wrap($checkboxes[i]).click({ force: true });
     }
    });
  });
});


Entao('o sistema deve registrar a indicação dos depósitos selecionados pelo Fisco exibindo a mensagem de sucesso correspondente', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get('tbody.p-datatable-tbody tr').first().find('td').then(($tds) => {
    const cpf = $tds.eq(2).text().replace(/[^\d]/g, '').trim();
    const nomeConsumidor  = $tds.eq(4).text().replace(/[^\d]/g, '').trim();
    const saldo           = $tds.eq(5).text().replace(/[^\d.-]/g, '').trim();

    cy.get(el.botaoIndicar).click();

    cy.contains(' Depósito Bancário - Indicação pelo Fisco ');
    })
  });
});



//CT02: Indicar depósito bancario sem preencher campos obrigatórios

Dado('que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('tentar indicar sem preencher um ou mais campos obrigatórios CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Entao('o sistema deve exibir mensagens de validação informando os campos obrigatórios não preenchidos sem realizar a indicação dos depósitos bancários CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido');
  });
});


//CT03: Indicar selecionando múltiplos registros

Dado('que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT03.1', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('selecionar múltiplos registros de depósito bancário CT03.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputSeqBeneficiario).type('0');
    cy.get(el.droprollDeIgualdade).click();
    cy.get(el.droprollOpcaoMaiorQue).click();
    cy.get(el.botaoConsultar).click();
    //Seleciona os 3 primeiros checkboxes
    cy.get('tbody .p-checkbox-box').then(($checkboxes) => {
     for (let i = 0; i < 3 && i < $checkboxes.length; i++) {
     cy.wrap($checkboxes[i]).click({ force: true });
     }
    });
  });
});

Quando('acionar a opção Indicar CT03.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoIndicar).click();
  });
});

Entao('o sistema deve negar a indicação de depósito bancário e exibir a mensagem MSG1: Para realizar essa ação é necessário selecionar somente um registro na tabela. CT03.1', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Para realizar essa ação é necessário selecionar somente um registro na tabela.');
  });
});



//CT04: Validar indicação pelo FISCO com valor acima do saldo disponível

Dado('que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT04', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuDepositoBancario).click();
  });
});

Quando('informar um valor superior ao saldo disponível CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputSeqBeneficiario).type('60000');
    cy.get(el.droprollDeIgualdade).click();
    cy.get(el.droprollOpcaoMaiorQue).click();
    cy.get(el.botaoConsultar).click();
  });
});

Quando('acionar o botão “Efetuar Indicação” CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get('.p-checkbox-box').first().click();
    cy.get(el.botaoIndicar).click();
    cy.get(el.inputIndicacaoRS).type('10000000');
    cy.get(el.dropSelecionarBanco).click();
    cy.get(el.dropOpcoesDeBanco).contains('001 - BANCO DO BRASIL S.A.').click();
    cy.get(el.inputAgencia).type('1887');
    cy.get(el.inputConta).type('514179');   
    cy.get(el.dropSelecionaTipoDeConta).click();
    cy.get(el.dropOpcaoTipoContaCorrente).click();
    cy.get(el.inputMotivacao).type('Tete de Valor Superior');
    cy.get(el.botaoEfetuarIndicacao).click();
  });
});


Entao('o sistema deve impedir o lançamento e exibir mensagem de erro “O valor informado para depósito é maior que o saldo disponível.” CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('O valor informado para depósito é maior que o saldo disponível.');
  });
});
