export const indicarPagamentoPremioPeloFiscoElements = {
  // MENUS E SUBMENOS
  menuSorteio: 'ul.layout-menu li a span:contains("Sorteio")',
  //Usa .eq(1) para acessar o certo
  //Ex: cy.get(el.menuSorteio).eq(1).click();
  subMenuIndicarPagamentoPremioPeloFisco: 'span:contains("Indicar Pagamento de Prêmio pelo Fisco")',

  //INPUTS
  inputCPF: '#cpfCnpj',
   //Inputs do "Extrair Dados"
  inputCPFNoExtracaoDeDados: '.ng-untouched.ng-star-inserted > :nth-child(1) > [style="display: flex;"] > #cpfCnpj',
  
  //BOTOES
  botaoConsultar: 'button:contains("Consultar")',
  botaoIndicar: 'button:contains("Indicar")',
  botaoSalvar: 'button:contains("Salvar")',
  botaoExportar: 'button:contains("Exportar")',
  botaoOpcaoExportarExcel: '.export-options li:nth-child(1)',
  botaoOpcaoExportarTXT: '.export-options li:nth-child(2)',
  botaoOpcaoExportarPDF: '.export-options li:nth-child(3)',
  botaoExtracaoDeDados: 'span:contains("Extração de Dados")',

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

// OU:

//Seleciona os 2 primeiros
//    for (let i = 0; i < 2; i++) {
//        cy.get('tbody input[type="checkbox"]').eq(i).click({ force: true });
//        cy.wait(300);
//    }
