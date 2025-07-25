import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const numeroSorteio = '23333';

// CT01: Alterar sorteio

Dado('que o usuário esteja na funcionalidade {string}', (ManterSorteio) => {
  cy.visit('http://homol.receitaweb.fazenda.df.gov.br/FwkLogin.html?Mensagem=');
  cy.title().should('eq', 'Receita WEB');
  cy.get('#txtUsuario').type('jrsneto');
  cy.get('#ctl00_loginTela_btnEntrar').click();
  cy.get('#CC2 > a > h3').click();

  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { numeroSorteio } }, ({ numeroSorteio }) => {
    cy.get('span')
      .contains(/^Sorteio$/)
      .parents('a')
      .should('be.visible')
      .click();
  });
});

Dado('tenha acessado o sorteio desejado para alteração', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { numeroSorteio } }, ({ numeroSorteio }) => {
    cy.contains('Manter Sorteio').click();
    cy.get('#numeroSorteio').type(numeroSorteio);
    cy.get('span.p-button-label').contains('Consultar').click();
    cy.get('.p-checkbox-box').click();
    cy.contains('button', 'Alterar').click();
  });
});

Quando('atualizar os campos permitidos com dados válidos', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', () => {
    const observacao = `teste_${Date.now()}`;

    cy.get('textarea.p-inputtextarea', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .then(($el) => {
        cy.log('Campo Observações encontrado');
        cy.wrap($el)
          .clear({ force: true })
          .type(observacao, { force: true });
      });
  });
});

Quando('remover ou deixar em branco campos obrigatórios', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', () => {
    cy.get('textarea.p-inputtextarea', { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .clear({ force: true });
  });
});

Quando('acionar o botão {string}', (botao) => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { botao } }, ({ botao }) => {
    cy.contains('button', botao).should('be.visible').click();
  });
});

// --- CT01 ---

Entao('confirma a alteração no modal', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', () => {
    cy.contains('button', 'Sim').should('be.visible').click();
  });
});

Entao('exibe a mensagem de confirmação “Sorteio alterado com sucesso!”', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', () => {
    cy.contains('Sorteio alterado com sucesso!').should('be.visible');
  });
});

// CT02: Validar campos obrigatórios.

Entao('o sistema exibe mensagens de erro indicando os campos obrigatórios não preenchidos', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', () => {
    cy.contains('O Observações é obrigatório.').should('be.visible');
  });
});

