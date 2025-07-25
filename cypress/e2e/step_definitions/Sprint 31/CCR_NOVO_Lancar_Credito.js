import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;


import { manterLancamentoFiscoElements as el } from '@pages/Conta_Corrente/Manter_Lancamento_Fisco.js';


//CT01: Realizar lançamento FISCO - Débito - Com valor Acima do Saldo

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT01', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os dados obrigatórios para lançamento do tipo Débito e colocar saldo superior ao disponível CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get('.p-checkbox-box').first().click();
    
    //Salva o valor do saldo disponível
    cy.contains('td', 'Saldo Disponível')
      .invoke('text')
      .then((textoCompleto) => {
    const valor = textoCompleto
      .replace('Saldo Disponível', '')
      .replace('R$', '')
      .trim();
    const valorNumerico = parseFloat(valor.replace('.', '').replace(',', '.'));
    const valorTotal = valorNumerico + 100000;

    cy.get(el.botaoLancar).click();
    cy.url().should('include', '/lancamento-fisco/incluir');
    cy.get(el.checkOpcaoDebito).click();
    cy.get(el.inputValorDisponivelDoDebito).type(valorTotal.toString());
    cy.get(el.inputMotivacao).type('Teste com valor acima');
    })
  });
});

Quando('acionar o botão “Efetuar Lançamento” CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoEfetuarLancamento).click();
  });
});


Entao('o sistema não realiza o lançamento e informa amensagem: O valor informado para depósito é maior que o saldo disponível. CT01', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('O valor informado para lançamento é maior que o saldo disponível.');
  });
});


//CT02: Realizar lançamento FISCO - Crédito - Com valor Acima do Saldo

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT02', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os dados obrigatórios para lançamento do tipo Crédito e colocar saldo superior ao disponível CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get('.p-checkbox-box').first().click();
    
    //Salva o valor do saldo disponível
    cy.contains('td', 'Saldo Disponível')
      .invoke('text')
      .then((textoCompleto) => {
    const valor = textoCompleto
      .replace('Saldo Disponível', '')
      .replace('R$', '')
      .trim();
    const valorNumerico = parseFloat(valor.replace('.', '').replace(',', '.'));
    const valorTotal = valorNumerico + 100000;

    cy.get(el.botaoLancar).click();
    cy.url().should('include', '/lancamento-fisco/incluir');
    cy.get(el.checkOpcaoCredito).click();
    cy.get(el.inputValorDisponivelCredito).type(valorTotal.toString());
    cy.get(el.inputMotivacao).type('Teste com valor acima');
    })
  });
});

Quando('acionar o botão “Efetuar Lançamento” CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoEfetuarLancamento).click();
  });
});


Entao('o sistema não realiza o lançamento e informa amensagem: O valor informado para depósito é maior que o saldo disponível. CT02', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('O valor informado para lançamento é maior que o saldo disponível.');
  });
});


//CT03: Realizar lançamento FISCO - Ambos - Com valor Acima do Saldo

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT03', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os dados obrigatórios para lançamento do tipo Ambos e colocar saldo superior ao disponível CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get('.p-checkbox-box').first().click();
    
    //Salva o valor do saldo disponível
    cy.contains('td', 'Saldo Disponível')
      .invoke('text')
      .then((textoCompleto) => {
    const valor = textoCompleto
      .replace('Saldo Disponível', '')
      .replace('R$', '')
      .trim();
    const valorNumerico = parseFloat(valor.replace('.', '').replace(',', '.'));
    const valorTotal = valorNumerico + 100000;

    cy.get(el.botaoLancar).click();
    cy.url().should('include', '/lancamento-fisco/incluir');
    cy.get(el.checkOpcaoAmbos).click();
    cy.get(el.inputValorDisponivelCredito).type(valorTotal.toString());
    cy.get(el.inputMotivacao).type('Teste com valor acima');
    })
  });
});

Quando('acionar o botão “Efetuar Lançamento” CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoEfetuarLancamento).click();
  });
});


Entao('o sistema não realiza o lançamento e informa amensagem: O valor informado para depósito é maior que o saldo disponível. CT03', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('O valor informado para lançamento é maior que o saldo disponível.');
  });
});


//CT04: Realizar lançamento FISCO - Débito

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT04', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os dados obrigatórios para lançamento do tipo Débito e colocar saldo a baixo do disponível CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get('.p-checkbox-box').first().click();
    
    cy.get(el.botaoLancar).click();
    cy.url().should('include', '/lancamento-fisco/incluir');
    cy.get(el.checkOpcaoDebito).click();
    cy.get(el.inputValorDisponivelDoDebito).type(10000);
    cy.get(el.inputMotivacao).type('Teste com valor a baixo do disponível');
    })
  });

Quando('acionar o botão “Efetuar Lançamento” CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoEfetuarLancamento).click();
  });
});


Entao('o sistema realiza o lançamento e informa amensagem: Operação realizada com sucesso. CT04', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Operação realizada com sucesso.');
  });
});


//CT05: Realizar lançamento FISCO - Crédito

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT05', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os dados obrigatórios para lançamento do tipo Crédito e colocar saldo a baixo do disponível CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get('.p-checkbox-box').first().click();
    
    cy.get(el.botaoLancar).click();
    cy.url().should('include', '/lancamento-fisco/incluir');
    cy.get(el.checkOpcaoCredito).click();
    cy.get(el.inputValorDisponivelCredito).type(10000);
    cy.get(el.inputMotivacao).type('Teste com valor a baixo do disponível');
    })
  });

Quando('acionar o botão “Efetuar Lançamento” CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoEfetuarLancamento).click();
  });
});


Entao('o sistema realiza o lançamento e informa amensagem: Operação realizada com sucesso. CT05', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Operação realizada com sucesso.');
  });
});


//CT06: Realizar lançamento FISCO - Ambos

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT06', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os dados obrigatórios para lançamento do tipo Ambos e colocar saldo a baixo do disponível CT06', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    cy.get(el.botaoConsultar).click();
    cy.get('.p-checkbox-box').first().click();
    
    cy.get(el.botaoLancar).click();
    cy.url().should('include', '/lancamento-fisco/incluir');
    cy.get(el.checkOpcaoAmbos).click();
    cy.get(el.inputValorDisponivelCredito).type(10000);
    cy.get(el.inputMotivacao).type('Teste com valor a baixo do disponível');
    })
  });

Quando('acionar o botão “Efetuar Lançamento” CT06', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoEfetuarLancamento).click();
  });
});


Entao('o sistema realiza o lançamento e informa amensagem: Operação realizada com sucesso. CT06', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Operação realizada com sucesso.');
  });
});


//CT07: Validar campos obrigatórios no Lançamento FISCO 

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT07', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('deixar de preencher um ou mais campos obrigatórios CT07', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    //Fica em branco mesmo
    })
  });

Quando('acionar o botão “Consultar” CT07', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});


Entao('o sistema informa amensagem: Pelo menos um campo deve ser preenchido. CT07', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Pelo menos um campo deve ser preenchido');
  });
});


//CT08: Selecionar múltiplos registros para Lançamento FISCO

Dado('que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT08', () => {
  cy.login_sistema('jrsneto', 'jrsneto');
  cy.get('#CC2').click();
  cy.origin('https://homol-ccr.fazenda.df.gov.br/home', { args: { el } }, ({ el }) => {
    cy.get(el.menuContaCorrente).click();
    cy.get(el.subMenuManterLancamentoFisco).click();
  });
});

Quando('informar os dados obrigatórios CT08', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.inputCpf).type('82016909153');
    })
  });

Quando('acionar o botão “Consultar” CT08', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoConsultar).click();
  });
});

Quando('escolher mais de um registros CT08', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    for (let i = 0; i < 2; i++) {
        cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
        cy.wait(300);
    }
  });
});

Quando('clicar em Lançar CT08', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.get(el.botaoLancar).click();
  });
});

Entao('o sistema informa amensagem: Para realizar essa ação é necessário selecionar somente um registro na tabela. CT08', () => {
  cy.origin('https://homol-ccr.fazenda.df.gov.br', { args: { el } }, ({ el }) => {
    cy.contains('Para realizar essa ação é necessário selecionar somente um registro na tabela');
  });
});