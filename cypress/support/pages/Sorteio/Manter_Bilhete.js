export const manterBilheteElements = {
  // MENUS E SUBMENOS
  menuSorteio: 'ul.layout-menu li a span:contains("Sorteio")',
  //Usa .eq(1) para acessar o certo
  //Ex: cy.get(el.menuSorteio).eq(1).click();
  subMenuManterBilhete: 'span:contains("Manter Bilhete")',

  //BOTOES
  botaoConsultar: 'button:contains("Consultar")',
  botaoExportar: 'button:contains("Exportar")',
  botaoOpcaoExportarExcel: '.export-options li:nth-child(1)',
  botaoOpcaoExportarTXT: '.export-options li:nth-child(2)',
  botaoOpcaoExportarPDF: '.export-options li:nth-child(3)',
  botaoExtracaoDeDados: 'span:contains("Extração de Dados")',
  
  //INPUTS
  inputCPF: '#numeroCpf',
  inputNumeroDoBilhete: '#numeroBilhete',
  inputNumeroDoSorteio: '#numeroSorteio',
  //Inputs do "Extrair Dados"
  inputCPFNoExtracaoDeDados: '.ng-untouched.ng-star-inserted > :nth-child(1) > [style="display: flex;"] > #numeroCpf',
  inputNumeroDoBilheteNoExtracaoDeDados: '.ng-untouched.ng-star-inserted > :nth-child(2) > [style="display: flex;"] > #numeroBilhete',
  inputNumeroDoSorteioNoExtracaoDeDados: '.ng-untouched.ng-star-inserted > :nth-child(3) > [style="display: flex;"] > #numeroSorteio',

  //TABELAS
  tabelaSorteio: 'tbody.p-datatable-tbody tr',

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