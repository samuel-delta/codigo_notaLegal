import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { manterBilheteElements as el } from '@pages/Sorteio/Manter_Bilhete.js';

//Cenário: CT01: Consultar Desbloqueio de Prêmio

Dado('que o usuário precise visualizar o histórico do bilhete', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});

Dado('esteja na tela “Manter Bilhete”', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuManterBilhete).click();
  });
});

Dado('forneça os parâmetros necessários para a consulta', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get(el.tabelaSorteio, { timeout: 15000 }).should('be.visible');
  });
});

Quando('o usuário selecionar um registro', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.tabelaSorteio).first().find('.p-checkbox-box').click({ force: true });
  });
});

Quando('acionar o botão “Histórico”', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    //Deixei Aqui Vazio
  });
});

Entao('o sistema apresenta a tela “Histórico” com os dados do registro selecionado.', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {

  //Salva os valores para conferir na próxima pagina e confere os valores no histórico
  cy.get('tbody.p-datatable-tbody tr').first().find('td').then(($tds) => {
    const numeroBilhete = $tds.eq(1).text().replace(/[^\d]/g, '').trim();
    const chaveBilhete  = $tds.eq(2).text().replace(/[^\d]/g, '').trim();
    const cpf           = $tds.eq(4).text().replace(/[^\d.-]/g, '').trim();

  cy.get(el.botaoHistorico).click();

  cy.contains(numeroBilhete).should('exist');
  cy.contains(chaveBilhete).should('exist');
  cy.contains(cpf).should('exist');
  });  
  });
});



//CT02: Visualizar Histórico Bilhete [Registro duplicado]

Dado('que o usuário precise visualizar o histórico do bilhete CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
});

Dado('esteja na tela “Manter Bilhete” CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuSorteio).eq(1).click();
    cy.get(el.subMenuManterBilhete).click();
  });
});

Dado('forneça os parâmetros necessários para a consulta CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.inputCPF).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get(el.tabelaSorteio, { timeout: 15000 }).should('be.visible');
  });
});

Quando('o usuário selecionar mais de um registro CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    for (let i = 0; i < 2; i++) {
        cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
        cy.wait(300);
    }
  });
});

Quando('acionar o botão “Histórico” CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.botaoHistorico).click();
  });
});

Entao('o sistema apresenta a mensagem MSG1: Para realizar essa ação é necessário selecionador somente um registro na tabela. CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.contains('Para realizar essa ação é necessário selecionar somente um registro na tabela.');
  });
});


