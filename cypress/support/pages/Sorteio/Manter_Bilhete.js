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
  
  //INPUTS
  inputCPF: '#numeroCpf',
  inputNumeroDoBilhete: '#numeroBilhete',
  inputNumeroDoSorteiro: '#numeroSorteio',

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