export const consultarPagamentoElements = {
  // MENUS E SUBMENOS
  menuSorteio: 'ul.layout-menu li a span:contains("Sorteio")',
  //Usa .eq(1) para acessar o certo
  //Ex: cy.get(el.menuSorteio).eq(1).click();
  subMenuConsultarPagamento: 'span:contains("Consultar Pagamento")',

  //INPUTSA
  inputCPF: '#cpf',
  //Extracao de Dados
  inputCPFExtracaoDeDados: 'form.ng-star-inserted > :nth-child(1) > [style="display: flex;"] > #cpf',
  
  //BOTOES
  botaoConsultar: 'button:contains("Consultar")',
  botaoExportar: 'button:contains("Exportar")',
  botaoOpcaoExportarExcel: '.export-options li:nth-child(1)',
  botaoOpcaoExportarTXT: '.export-options li:nth-child(2)',
  botaoOpcaoExportarPDF: '.export-options li:nth-child(3)',
  botaoExtracaoDeDados: 'span:contains("Extração de Dados")',

  //TABELA
  tabelaDeConsultarPagamento: 'tbody.p-datatable-tbody tr',
  tabelaPrimeiroElemento: '.p-datatable-tbody > :nth-child(1)',

}

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