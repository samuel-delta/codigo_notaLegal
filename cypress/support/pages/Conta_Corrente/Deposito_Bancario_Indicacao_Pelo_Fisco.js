export const depositoBancarioIndicacaoElements = {
  // MENUS E SUBMENOS
  menuContaCorrente: 'span:contains("Conta Corrente")',
  subMenuDepositoBancario: 'span:contains("Depósito Bancário - Indicação pelo Fisco")',

  //BOTOES
  botaoConsultar: 'button:contains("Consultar")',
  botaoIndicar: 'button:contains("Indicar")',
  botaoLimpar: 'button:contains("Limpar")',
  botaoExportar: 'button:contains("Exportar")',
  botaoOpcaoExportarExcel: '.export-options li:nth-child(1)',
  botaoOpcaoExportarTXT: '.export-options li:nth-child(2)',
  botaoOpcaoExportarPDF: '.export-options li:nth-child(3)',
  //Botões dos dados bancários da indicação
  botaoEfetuarIndicacao: 'button:contains("Efetuar Indicação")',
  //Extração de dados
  botaoExtracaoDeDados: 'button:contains("Extração de Dados")',
  inputExtracaoCpf: '.field input#cpfCnpj',
 
  // INPUTS
  inputCpf: '#cpfCnpj',
  inputSeqBeneficiario: '#seqBeneficiario',
  //Input dos dados bancários da indicação
  inputIndicacaoRS: '#indicacao',
  inputAgencia: '#agencia',
  inputConta: '#conta',
  inputMotivacao: '#motivacao',

  //MENSAGENS
  mensagemDeCampoObrigatorio: 'div.p-toast-detail',
  mensagemDeAvisoDeIndicacao: 'div.p-toast-detail',

  //DROPROLLS
  droprollDeIgualdade: '#pn_id_11 > .p-dropdown-trigger',
  droprollOpcaoMaiorQue: 'li[role="option"][aria-posinset="3"]',
  //Droproll dos dados bancários da indicação
  dropSelecionarBanco: '.p-autocomplete > .p-ripple',
  dropOpcoesDeBanco: 'li.p-autocomplete-item', //no codigo colocar algo como: cy.get(el.dropOpcoes).contains('BANCO DO NORDESTE').click();
  dropSelecionaTipoDeConta: 'p-dropdown[placeholder="Selecione"]',
  dropOpcaoTipoContaCorrente: 'li.p-dropdown-item[aria-label="Conta Corrente"]',
   

  //CHECKS
  checkSelecionarTodos: 'i.pi.pi-stop',

   //TABELAS
  tabelaDepositoBancario: 'tbody.p-datatable-tbody tr',

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