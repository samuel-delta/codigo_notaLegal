export const manterLancamentoFiscoElements = {
  // MENUS E SUBMENOS
  menuContaCorrente: 'span:contains("Conta Corrente")',
  subMenuManterLancamentoFisco: 'span:contains("Manter Lançamento – Fisco")',

  //BOTOES
  botaoConsultar: 'button:contains("Consultar")',
  botaoExportar: 'button:contains("Exportar")',
  botaoLancar: 'button:contains("Lançar")',
  botaoLimpar: 'button:contains("Limpar")',
  botaoExportar: 'button:contains("Exportar")',
  botaoOpcaoExportarExcel: '.export-options li:nth-child(1)',
  botaoOpcaoExportarTXT: '.export-options li:nth-child(2)',
  botaoOpcaoExportarPDF: '.export-options li:nth-child(3)',
  botaoExtracaoDeDados: 'span:contains("Extração de Dados")',
  //Botões dos dados bancários da indicação
  botaoEfetuarLancamento: 'button:contains("Efetuar Lançamento")',
  //Botoes da Extração de Dados
  botaoExtracaoExtrair: '.export-dropdown > .p-element',

  // INPUTS
  inputCpf: '#cpfCnpj',
  inputSeqBeneficiario: '#seqLancFisco',
  //Input dos dados bancários da indicação
  inputIndicacaoRS: '#indicacao',
  inputMotivacao: '#motivacao',
  inputValorDisponivelDoDebito: '#valorDebito',
  inputValorDisponivelCredito: '#valorCredito',
  //Input da Extração de Dados
  inputExtracaoCPF: '.ng-pristine.ng-star-inserted > :nth-child(1) > [style="display: flex;"] > #cpfCnpj',


  //CHECKS
  checkOpcaoDebito: ':nth-child(2) > .ng-untouched > .p-radiobutton > .p-radiobutton-box',
  checkOpcaoCredito: ':nth-child(1) > .ng-valid > .p-radiobutton > .p-radiobutton-box',
  checkOpcaoAmbos: ':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box',

  //LOAD
  load: '.p-dialog-mask.p-component-overlay', // Colocando aqui para usar para esperar o load terminar antes de seguir codigo
  // Exemplo: cy.get(el.load, { timeout: 10000 }).should('not.exist'); -> Espera load sumir por 10 segundos para seguir
};

  
//CODIGOS DE SUPORTE:

//SELECIONANDO CHECKBOXES

//Seleciona os 10 primeiros checkboxes (muda o 10 para selecinar menos)
//    cy.get('tbody input[type="checkbox"]').then(($checkboxes) => {
//      for (let i = 0; i < 10 && i < $checkboxes.length; i++) {
//      cy.wrap($checkboxes[i]).click({ force: true });
//      }
//    });

// OU:

//Seleciona os 2 primeiros
//    for (let i = 0; i < 2; i++) {
//        cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
//        cy.wait(300);
//    }

//Salva o valor dos 2 primeiros dados da tabela -> Para salvar mais valores só mudar o valor "2" no "ifn(index < 2)"
//  const dadosTabela = [];

//  cy.get('tbody tr').each(($row, index) => {
//    if (index < 2) { 
//      const dadosLinha = [];
//      cy.wrap($row).find('td').each(($cell) => {
//      const texto = $cell
//        .contents()
//       .filter(function() {
//        return this.nodeType === 3; // Só pega texto puro, ignora spans, divs e labels
//        })
//       .text()
//        .trim();
//
//    if (texto) {
//      dadosLinha.push(texto);
//      }
//    }).then(() => {
//      dadosTabela.push(dadosLinha);
//    });
//    }
//    }).then(() => {
//      cy.wrap(dadosTabela).as('dadosTabela');
//      Cypress.env('dadosTabelaExtraidos', dadosTabela);
//    });   