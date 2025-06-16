import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { manterLimtesEFMCCDoCNAEElements as el } from '@pages/Tabelas/Manter_Limites_e_FMCC_do_CNAE.js';

//CT01: Validar alteração do nome da funcionalidade para “Manter limites e FMCC do CNAE”

Dado('que o usuário esteja na funcionalidade manter limites e FMCC do CNAE CT01', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});

Quando('selecionar um CNAE existente CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get('tbody input[type="checkbox"]').eq(0).click({ force: true });
  });
});

Quando('acionar o botão “Alterar Limites” CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoAlterarLimites).click();
  });
});

Quando('alterar os valores de limite permitidos CT01', () => {
  //Vai pegar o valor atual e somar um!
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputLimiteDiario).invoke('val').then((valorAtual) => {
  const novoValorDiario = (parseInt(valorAtual) + 1).toString();
  cy.get(el.inputLimiteDiario).clear().type(novoValorDiario);
  });

  cy.get(el.inputLimiteMensal).invoke('val').then((valorAtual) => {
  const novoValorMensal = (parseInt(valorAtual) + 1).toString();
  cy.get(el.inputLimiteMensal).clear().type(novoValorMensal);
  });
  });
});

Quando('acionar o botão Salvar CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoSalvar).click();
  });
});

Entao('o sistema deve registrar a alteração dos limites para o CNAE selecionado e exibir mensagem de sucesso correspondente CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.contains('Limites alterados com sucesso.').should('be.visible');
  cy.get('tbody.p-datatable-tbody tr').first().find('td').eq(7).should('contain.text', '1')
  cy.get('tbody.p-datatable-tbody tr').first().find('td').eq(7).should('contain.text', '2')
  });
});


//CT02: Alterar sem preencher campos obrigatórios

Dado('que o usuário esteja na funcionalidade manter limites e FMCC do CNAE CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuTabelas).click();
    cy.get(el.subMenuManterLimitesFMCCCNAE).click();
  });
});

Quando('selecionar um CNAE existente CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get('tbody input[type="checkbox"]').eq(0).click({ force: true });
  });
});

Quando('acionar o botão “Alterar Limites” CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoAlterarLimites).click();
  });
}); 

Quando('deixar os campos Limite Diário e ou Limite Mensal vazios CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
  cy.get(el.inputLimiteDiario).clear().blur();
  cy.get(el.inputLimiteMensal).clear().blur();
  });
});

Quando('acionar o botão Salvar CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Deixa em branco
  });
});

Entao('o sistema exibe mensagem informando que os campos são obrigatórios e não realiza a alteração CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Limite Diário é obrigatório.');
    cy.contains('Limite Mensal é obrigatório.');
  });
});

