import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const Dado = Given;
const Quando = When;
const Entao = Then;

const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';



// CT01 - Realizar indicação de créditos para IPVA (Veículos) pelo FISCO (00121776344)
Dado('que o usuário esteja logado no ReceitaWeb INDICACAO_CT01', () => {
  cy.loginReceitaWeb();
});

Dado('que o usuário esteja na funcionalidade "Indicação para IPTU IPVA pelo FISCO" INDICACAO_CT01', () => {
  cy.acessarContaCorrente('Indicação para IPTU/IPVA pelo Fisco');
});

Quando('informar os parâmetros obrigatórios da consulta INDICACAO_CT01', () => {
  cy.preencherCpfCnpj('84600918134');
  cy.clicarBotaoConsultar();
});

Quando('selecionar um registro para indicação de créditos para IPVA INDICACAO_CT01', () => {
  cy.selecionarCheckboxs();
  cy.botaoIndicar();
});

Quando('preencher os campos obrigatórios para realizar a indicação INDICACAO_CT01', () => {
  cy.preencherIpvaIptu('00121776344');
  cy.botaoValidar();
  cy.validarDadoVisivel('JHU6714');
  cy.validarDadoVisivel('GM/ASTRA HB 4P ADVANTAGE');
  cy.validarDadoVisivel('ANTONIO MENDES DE SOUSA OLIVEIRA');
  cy.selecionarComboBox('2025');
  cy.preencherValor('100,00');
  cy.preencherMotivacao('TESTE DELTA - AUTOMAÇÃO');
  cy.botaoEfetuarIndicacao();
});

Entao('o sistema exibe a mensagem de sucesso "Operação realizada com sucesso." INDICACAO_CT01', () => {
  cy.validarMensagemSucesso();
});

// CT02 - Realizar indicação de créditos para IPTU (IMÓVEL) pelo FISCO (47615109)
Quando('informar os parâmetros obrigatórios da consulta INDICACAO_CT02', () => {
  cy.preencherCpfCnpj('83134140144');
  cy.clicarBotaoConsultar();
});

Quando('selecionar um registro para indicação de créditos para IPTU INDICACAO_CT02', () => {
  cy.selecionarCheckboxs();
  cy.botaoIndicar();
});

Quando('preencher os campos obrigatórios para realizar a indicação INDICACAO_CT02', () => {
  cy.selecionarRadioButton('Imóvel');  
  cy.preencherIpvaIptu('47615109');
  cy.botaoValidar();
  cy.validarDadoVisivel('AGUAS CLARAS QD 202 PRACA IRERE LT 12 BL A AP 402');
  cy.validarDadoVisivel('BRASILIA');
  cy.validarDadoVisivel('FABIANA LOPES DE ALENCAR LIMA');
  cy.selecionarComboBox('2025');
  cy.preencherValor('100,00');
  cy.preencherMotivacao('TESTE DELTA - AUTOMAÇÃO');
  cy.botaoEfetuarIndicacao();
});

Entao('o sistema exibe a mensagem de sucesso "Operação realizada com sucesso." INDICACAO_CT02', () => {
  cy.validarMensagemSucesso();
});

// CT03 - Selecionar mais de um registro e acionar “Indicar”
Quando('o usuário realizar uma consulta válida INDICACAO_CT03', () => {
    cy.preencherCpfCnpj('83579907115, 01060061180');
    cy.selecionarOperador('Lista');
    cy.clicarBotaoConsultar();
    
});

Quando('selecionar mais de um registro INDICACAO_CT03', () => {
    cy.selecionarCheckboxs(2);
});

Quando('acionar o botão Indicar INDICACAO_CT03', () => {
    cy.botaoIndicar();
});

Entao('o sistema exibe a mensagem "Para realizar essa ação é necessário selecionar somente um registro na tabela." INDICACAO_CT03', () => {
    cy.validarMensagemRegistrosDuplicado();
    
});

//CT04 - Validar campos obrigatórios na indicação
Quando('o usuário realizar uma consulta válida INDICACAO_CT04', () => {
    cy.preencherCpfCnpj('82016909153');
    cy.clicarBotaoConsultar();
});

Quando('que o usuário tenha selecionado um registro da listagem para indicar INDICACAO_CT04', () => {
  cy.selecionarCheckboxs(1);
  cy.botaoIndicar();
});

Quando('não informar os parâmetros obrigatórios para indicação INDICACAO_CT04', () => {
  cy.preencherIpvaIptu(null);
  cy.preencherMotivacao(null);
  cy.preencherIpvaIptu(null);
  
});

Entao('o sistema exibe a mensagem "Motivação é obrigatório." INDICACAO_CT04', () => {
  cy.validarDadoVisivel('Informe o Renavam.');
  cy.validarDadoVisivel('Motivação é obrigatório.'); 
  
});

// CT05 - Informar Inscrição inválida
Quando('o usuário realizar uma consulta válida INDICACAO_CT05', () => {
  cy.preencherCpfCnpj('82016909153');
  cy.clicarBotaoConsultar();
});

Quando('que o usuário tenha selecionado um registro da listagem para indicar INDICACAO_CT05', () => {
  cy.selecionarCheckboxs(1);
  cy.botaoIndicar();
});

Quando('preencher o campo "Inscrição" com dados invalidos INDICACAO_CT05', () => {
  cy.selecionarRadioButton('Imóvel');  
  cy.preencherIpvaIptu('123456');
  cy.botaoValidar();
});


Entao('o sistema apresenta a mensagem "Número da inscrição do imóvel inválido."INDICACAO_CT05', () => {
  cy.mensagemImovelInvalido();
  });


  // CT06 - Informar Renavam inválido
Quando('o usuário realizar uma consulta válida INDICACAO_CT06', () => {
  cy.preencherCpfCnpj('82016909153');
  cy.clicarBotaoConsultar();
});

Quando('que o usuário tenha selecionado um registro da listagem para indicar INDICACAO_CT06', () => {
  cy.selecionarCheckboxs(1);
  cy.botaoIndicar();
});

Quando('preencher o campo "Renavam" com dados invalidos INDICACAO_CT06', () => {
  cy.preencherIpvaIptu('123456');
  cy.botaoValidar();
});


Entao('o sistema apresenta a mensagem "Número do RENAVAM inválido."INDICACAO_CT06', () => {
  cy.mensagemRenavamInvalido();
  });
