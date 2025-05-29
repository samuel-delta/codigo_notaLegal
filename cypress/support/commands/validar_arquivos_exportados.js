import { normalizarCampo } from '../utils.js';

Cypress.Commands.add('validarArquivosExportados', (caminhoTxt, caminhoPdf, caminhoExcel, dadosEsperados) => {
  const camposEsperadosNormalizados = dadosEsperados.flat().map(normalizarCampo);

  // TXT
  if (caminhoTxt) {
    cy.task('readTXT', caminhoTxt).then((txtText) => {
      const textoNormalizado = normalizarCampo(txtText);
      camposEsperadosNormalizados.forEach((campo) => {
        expect(textoNormalizado).to.include(campo);
      });
    });
  }

  // PDF
  if (caminhoPdf) {
    cy.task('readPDF', caminhoPdf).then((pdfText) => {
      const textoNormalizado = normalizarCampo(pdfText);
      camposEsperadosNormalizados.forEach((campo) => {
        expect(textoNormalizado).to.include(campo);
      });
    });
  }

  // Excel
  if (caminhoExcel) {
    cy.task('readExcel', caminhoExcel).then((excelData) => {
      const textoNormalizado = normalizarCampo(excelData.flat().join(' '));
      camposEsperadosNormalizados.forEach((campo) => {
        expect(textoNormalizado).to.include(campo);
      });
    });
  }

  // Cleanup
  cy.task('deleteDownloads');
});

//Exemplo de como usar no código:

//Entao('o sistema apresenta o arquivo com os dados de acordo com os selecionados CT04', () => {
  
//  const dadosEsperados = Cypress.env('dadosTabelaExtraidos');

//  cy.validarArquivosExportados(
//    'cypress/downloads/BilhetePremiado.txt', -> aqui você edita o nome do arquivo!
//    'cypress/downloads/BilhetePremiado.pdf',
//    'cypress/downloads/BilhetePremiado.xlsx',
//  dadosEsperados
//  );
//});


