const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';

// LOGIN RECEITA WEB
Cypress.Commands.add('loginReceitaWeb', () => {
  cy.visit('http://homol.receitaweb.fazenda.df.gov.br/FwkLogin.html?Mensagem=');
  cy.title().should('eq', 'Receita WEB');
  cy.get('#txtUsuario').type('jrsneto');
  cy.get('#ctl00_loginTela_btnEntrar').click();
  cy.get('#CC2 > a > h3').click();
});

// ACESSAR MENU RECLAMAÇÃO
Cypress.Commands.add('acessarReclamacao', (nome) => {
  cy.origin(baseUrlCcr, { args: { nome } }, ({ nome }) => {
    cy.get('span').contains(/^Reclamações$/).parents('a').click();
    cy.contains('span', nome).click();
  });
});

// ACESSAR MENU CONSULTAS
Cypress.Commands.add('acessarConsultas', (nome) => {
  cy.origin(baseUrlCcr, { args: { nome } }, ({ nome }) => {
    cy.get('span').contains(/^Consultas$/).parents('a').click();
    cy.contains('span', nome).click();
  });
});

// ACESSAR MENU SORTEIO
Cypress.Commands.add('acessarSorteio', (nome) => {
  cy.origin(baseUrlCcr, { args: { nome } }, ({ nome }) => {
    cy.get('span').contains(/^Sorteio$/).parents('a').click();
    cy.contains('span', nome).click();
  });
});

// ACESSAR MENU CONTA CORRENTE
Cypress.Commands.add('acessarContaCorrente', (nome) => {
  cy.origin(baseUrlCcr, { args: { nome } }, ({ nome }) => {
    cy.get('span').contains(/^Conta Corrente$/).parents('a').click();
    cy.contains('span', nome).click();
  });
});

// PREENCHER CAMPO "NUMERO SORTEIO"
Cypress.Commands.add('preencherNumeroSorteio', (valor) => {
  cy.origin(baseUrlCcr, { args: { valor } }, ({ valor }) => {
    cy.get('#numeroSorteio', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type(valor, { force: true });
  });
});

// PREENCHER CAMPO "CPF/CNPJ"
Cypress.Commands.add('preencherCpfCnpj', (cpfCnpj) => {
  cy.origin(baseUrlCcr, { args: { cpfCnpj } }, ({ cpfCnpj }) => {
    cy.get('#cpfCnpj', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type(cpfCnpj, { force: true });
  });
});

// PREENCHER CAMPO "SEQUENCIAL"
Cypress.Commands.add('preencherSequencial', (sequencial) => {
  cy.origin(baseUrlCcr, { args: { sequencial } }, ({ sequencial }) => {
    cy.get('#sequencial', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type(sequencial, { force: true });
  });
});

// PREENCHER CAMPO "IPVA / IPTU" (INDICAÇÃO)
Cypress.Commands.add('preencherIpvaIptu', (ipvaIptu) => {
  cy.origin(baseUrlCcr, { args: { ipvaIptu } }, ({ ipvaIptu }) => {
    cy.get('#codigoBem', { timeout: 10000 }).should('be.visible').then($el => {
      if (ipvaIptu !== undefined && ipvaIptu !== null && ipvaIptu !== '') {
        cy.wrap($el).clear({ force: true }).type(ipvaIptu, { force: true });
      } else {
        cy.wrap($el).click({ force: true });
      }
    });
  });
});


// PREENCHER CAMPO "VALOR DISPONIVEL R$" (INDICAÇÃO)
Cypress.Commands.add('preencherValor', (valorDisponivel) => {
  cy.origin(baseUrlCcr, { args: { valorDisponivel } }, ({ valorDisponivel }) => {
    cy.get('#valorDisponivel', { timeout: 10000 })
      .should('be.visible')
      .clear({ force: true })
      .type(valorDisponivel, { force: true });
  });
});

// PREENCHER CAMPO "MOTIVAÇÃO" (INDICAÇÃO)
Cypress.Commands.add('preencherMotivacao', (motivacao) => {
  cy.origin(baseUrlCcr, { args: { motivacao } }, ({ motivacao }) => {
    cy.get('#motivacao', { timeout: 10000 }).should('be.visible').then($el => {
      if (motivacao !== undefined && motivacao !== null && motivacao !== '') {
        cy.wrap($el).clear({ force: true }).type(motivacao, { force: true });
      } else {
        cy.wrap($el).click({ force: true });
      }
    });
  });
});





// PREENCHER NÚMERO SORTEIO (EXTRAÇÃO DE DADOS)
Cypress.Commands.add('preencherNumeroSorteioExtracao', (valor) => {
  cy.origin(baseUrlCcr, { args: { valor } }, ({ valor }) => {
    cy.get('#numeroSorteio', { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .clear({ force: true })
      .type(valor, { force: true })
      .should('have.value', valor); // ✅ Valida que o valor foi realmente preenchido
  });
});

// PREENCHER CPF/CNPJ (EXTRAÇÃO DE DADOS)
Cypress.Commands.add('preencherCpfCnpjExtracao', (valor) => {
  cy.origin(baseUrlCcr, { args: { valor } }, ({ valor }) => {
    cy.get('input[id="cpfCnpj"]:visible', { timeout: 10000 })
      .first()
      .should('exist')
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(valor, { force: true })
      .should('have.value', valor);
  });
});

// PREENCHER RECLAMAÇÃO (EXTRAÇÃO DE DADOS)
Cypress.Commands.add('preencherReclamacaoExtracao', (reclamacao) => {
  cy.origin(baseUrlCcr, { args: { reclamacao } }, ({ reclamacao }) => {
    cy.get('input[id="reclamacao"]:visible', { timeout: 10000 })
      .first()
      .should('exist')
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(reclamacao, { force: true })
      .should('have.value', reclamacao);
  });
});



// PREENCHER NUMERO RECLAMACAO
Cypress.Commands.add('preencherReclamacao', (numero) => {
  cy.origin(baseUrlCcr, { args: { numero } }, ({ numero }) => {
    cy.get('#reclamacao').clear({ force: true });
    if (numero && numero.trim() !== '') {
      cy.get('#reclamacao').type(numero, { force: true });
    }
  });
});

// PREENCHER FILTRO DE PERÍODO COM OPERADOR ">" (com modal)
Cypress.Commands.add('preencherFiltroPeriodoComOperadorMaiorQueModal', (periodo) => {
  cy.origin(baseUrlCcr, { args: { periodo } }, ({ periodo }) => {
    cy.get('input[formcontrolname="dataInicial"]:visible').first().clear({ force: true }).type(periodo, { force: true });
    cy.get('div.p-dialog-content').should('not.exist'); 
    cy.get('p-dropdown').first().click({ force: true });
    cy.get('li[role="option"][aria-label=">"]').click();
  });
});

// PREENCHER FILTRO DE PERÍODO COM OPERADOR ">" 
Cypress.Commands.add('preencherFiltroPeriodoComOperadorMaiorQue', (periodo) => {
  cy.origin(baseUrlCcr, { args: { periodo } }, ({ periodo }) => {
    // Preencher o campo de período
    cy.get('input[formcontrolname="dataInicial"]:visible')
      .first()
      .clear({ force: true })
      .type(periodo, { force: true });
      });
});

// PREENCHER FILTRO DE PERÍODO (EXTRAÇÃO DE DADOS)
Cypress.Commands.add('preencherFiltroPeriodoExtracao', (periodo) => {
  cy.origin(baseUrlCcr, { args: { periodo } }, ({ periodo }) => {
    cy.get('input[formcontrolname="dataInicial"]:visible')
      .first()
      .clear({ force: true })
      .type(periodo, { force: true });
    // NÃO colocar cy.get('div.p-dialog-content').should('not.exist');
  });
});

// OPERADORES 
Cypress.Commands.add('selecionarOperador', (operador) => {
  cy.origin(baseUrlCcr, { args: { operador } }, ({ operador }) => {
    cy.get('p-dropdown').first().click();

    cy.get('li[role="option"]').then($options => {
      const optionExata = Array.from($options).find(option => option.innerText.trim() === operador);
      if (optionExata) {
       cy.wrap(optionExata).click();
      }
   });
  });
});







// VALIDAR PERÍODO NA TABELA (SEM NENHUMA LINHA ANTERIOR AO FILTRO)
Cypress.Commands.add('validarPeriodoNaTabelaMaiorOuIgual', (periodo) => {
  const partes = periodo.split('/');
  const mesFiltro = parseInt(partes[0], 10);
  const anoFiltro = parseInt(partes[1], 10);

  let linhas = [];

  return cy.origin(baseUrlCcr, { args: { mesFiltro, anoFiltro } }, ({ mesFiltro, anoFiltro }) => {
    return cy.get('table tbody tr').then(($rows) => {
      const dados = [];

      $rows.each((_, row) => {
        const textoLinha = row.innerText.trim().replace(/\s+/g, ' ');
        const regexData = /\b(0[1-9]|1[0-2])\/\d{4}\b/;
        const match = textoLinha.match(regexData);

        if (match) {
          const partesData = match[0].split('/');
          const mes = parseInt(partesData[0], 10);
          const ano = parseInt(partesData[1], 10);

          const isAnterior = ano < anoFiltro || (ano === anoFiltro && mes < mesFiltro);
          expect(isAnterior, `Período "${match[0]}" NÃO deve ser anterior a "${mesFiltro}/${anoFiltro}"`).to.be.false;
        }

        dados.push(textoLinha);
      });

      return dados;
    });
  });
});


// BOTÃO "CONSULTAR"
Cypress.Commands.add('clicarBotaoConsultar', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('span.p-button-label').contains('Consultar').click();
  });
});

// BOTÃO "VISUALIZAR"
Cypress.Commands.add('clicarBotaoVisualizar', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('span.p-button-label').contains('Visualizar').click();
  });
});

// BOTÃO "VALIDAR"
Cypress.Commands.add('botaoValidar', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('span.p-button-label').contains('Validar').click();
  });
});

// BOTÃO "EFETUAR INDICAÇÃO"
Cypress.Commands.add('botaoEfetuarIndicacao', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('span.p-button-label').contains('Efetuar Indicação').click();
  });
});

// BOTÃO "INDICAR"
Cypress.Commands.add('botaoIndicar', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('span.p-button-label').contains('Indicar').click();
  });
});

// BOTÃO EXTRAÇÃO DE DADOS
Cypress.Commands.add('botaoExtracaoDeDados', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('button').contains('Extração de Dados').click();
  });
});

// BOTÃO BUSCAR BEM FISCO
Cypress.Commands.add('botaoBuscarFisco', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('button').contains('Buscar Bem Fisco').click();
  });
});

// BOTÃO BUSCAR BEM FISCO
Cypress.Commands.add('botaoRevisarBem', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('button').contains('Revisar Bem').click();
  });
});

// SELECIONAR RADIO BUTTON POR TEXTO (EX: cy.selecionarRadioButton('Imóvel');  )
Cypress.Commands.add('selecionarRadioButton', (texto) => {
  cy.origin(baseUrlCcr, { args: { texto } }, ({ texto }) => {
    cy.contains('label', texto)
      .should('be.visible')
      .click({ force: true });
  });
});



// SELECIONAR O PRIMEIRO REGISTRO E VALIDAR
Cypress.Commands.add('selecionar1CapturarDadoGrid', () => {
  const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';

  cy.origin(baseUrlCcr, () => {
    cy.get('table tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .first()
      .then(($linha) => {
        const textoLinha = $linha.text().trim().replace(/\s+/g, ' ');

        cy.wrap($linha).find('.p-checkbox-box').click({ force: true });

        // Salvar linha fora do cy.origin
        cy.wrap(null).then(() => {
          Cypress.env('linhaSelecionada', textoLinha);
        });
      });
  });
});


// SELECIONAR OS 3 PRIMEIROS REGISTROS E VALIDAR
Cypress.Commands.add('selecionar3CapturarDadosGrid', () => {
  const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';

  cy.origin(baseUrlCcr, () => {
    const dadosSelecionados = [];
    for (let i = 0; i < 3; i++) {
      cy.get('table tbody tr', { timeout: 10000 }).eq(i).then(($tr) => {
        const textoLinha = $tr.text().trim().replace(/\s+/g, ' ');
        dadosSelecionados.push(textoLinha);
        cy.wrap($tr).find('.p-checkbox-box').click({ force: true });
      });
          }
    cy.then(() => {
      Cypress.env('linhasSelecionadas', dadosSelecionados);
    });
  });
});



//VALIDAR NUMERO DA CONSULTA NO BOTÃO VISUALIZAR
Cypress.Commands.add('validarNumeroNaVisualizacao', (numeroEsperado) => {
  const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';

  cy.origin(baseUrlCcr, { args: { numeroEsperado } }, ({ numeroEsperado }) => {
    cy.contains(/Visualizar Sorteio/i, { timeout: 15000 }).should('be.visible');

    cy.get('input#numero')
      .should('be.visible')
      .should('have.attr', 'disabled');

    cy.get('input#numero')
      .should('have.value', numeroEsperado);
  });
});


// VALIDAR DADOS DOS 3 PRIMEIROS REGISTROS SELECIONADOS NOS ARQUIVOS EXPORTADOS

Cypress.Commands.add('validarSomenteSelecionadosNosArquivos', (extensoes = ['.xlsx', '.txt', '.pdf']) => {
  const downloadsFolder = Cypress.config('downloadsFolder');
  const dadosEsperados = Cypress.env('linhasSelecionadas');

  expect(dadosEsperados, 'linhas selecionadas').to.be.an('array').and.have.length.greaterThan(0);

  const normalizar = (texto) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const promises = extensoes.map((ext) => {
    return cy.task('findDownloadedFile', { folder: downloadsFolder, extension: ext }).then((fileName) => {
      const filePath = `${downloadsFolder}/${fileName}`;

      if (ext === '.xlsx') {
        return cy.task('readExcel', filePath).then((rows) => {
          const conteudo = rows.map(row => normalizar(row.join(' '))).join(' ');
          dadosEsperados.forEach((linha) => {
            expect(conteudo).to.include(normalizar(linha));
          });
        });
      }

      if (ext === '.txt') {
        return cy.task('readTXT', filePath).then((text) => {
          const conteudo = text
            .split('\n')
            .filter(l => !l.toLowerCase().includes('numero do sorteio'))
            .join(' ')
            .replace(/\|/g, ' ')
            .replace(/\s+/g, ' ')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .trim();

          dadosEsperados.forEach((linha) => {
            expect(conteudo).to.include(normalizar(linha));
          });
        });
      }

      if (ext === '.pdf') {
        return cy.task('readPDF', filePath).then((text) => {
          const conteudo = text
            .replace(/Relatorio Estatistica Sorteio/gi, '')
            .replace(/Pagina \d+ de \d+/gi, '')
            .replace(/Emitido em: .*/gi, '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .trim();

          const tokens = conteudo.match(/[\d,.]+|[a-zA-Z]+/g) || [];
          const conteudoFormatado = tokens.join(' ');

          dadosEsperados.forEach((linha) => {
            const camposEsperados = normalizar(linha).split(' ');
            let indexAtual = 0;
            const encontrado = camposEsperados.every((campo) => {
              const pos = conteudoFormatado.indexOf(campo, indexAtual);
              if (pos === -1) return false;
              indexAtual = pos + campo.length;
              return true;
            });
            expect(encontrado).to.be.true;
          });
        });
      }
    });
  });

  // Espera todas as promessas e depois limpa a pasta de downloads
  return Cypress.Promise.all(promises).then(() => {
    cy.task('limparDownloads');
  });
});

// VALIDAR DADOS DA PRIMEIRA LINHA SELECIONADA NOS ARQUIVOS EXPORTADOS
Cypress.Commands.add('validarLinhaSelecionadaNosArquivos', (extensoes = ['.xlsx', '.txt', '.pdf']) => {
  const downloadsFolder = Cypress.config('downloadsFolder');
  const linhaSelecionada = Cypress.env('linhaSelecionada');

  expect(linhaSelecionada, 'linha selecionada').to.be.a('string').and.not.be.empty;

  const normalizar = (texto) =>
    texto
      .normalize('NFD')                      // Remove acentos
      .replace(/[\u0300-\u036f]/g, '')       // Remove os sinais de acentuação
      .replace(/\s+/g, ' ')                   // Remove espaços extras
      .trim()
      .toLowerCase();                         // Caixa baixa

  const linhaNormalizada = normalizar(linhaSelecionada);

  const promises = extensoes.map((ext) => {
    return cy.task('findDownloadedFile', { folder: downloadsFolder, extension: ext }).then((fileName) => {
      const filePath = `${downloadsFolder}/${fileName}`;

      if (ext === '.xlsx') {
        return cy.task('readExcel', filePath).then((rows) => {
          const conteudo = rows.map(row => normalizar(row.join(' '))).join(' ');
          expect(conteudo).to.include(linhaNormalizada);
        });
      }

      if (ext === '.txt') {
        return cy.task('readTXT', filePath).then((text) => {
          const conteudo = text
            .split('\n')
            .filter(l => !l.toLowerCase().includes('numero do sorteio')) // remove cabeçalho
            .join(' ')
            .replace(/\|/g, ' ')
            .replace(/\s+/g, ' ')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
            .toLowerCase();

          expect(conteudo).to.include(linhaNormalizada);
        });
      }

      if (ext === '.pdf') {
        return cy.task('readPDF', filePath).then((text) => {
          let conteudo = text
            .replace(/Relatorio Estatistica Sorteio/gi, '')
            .replace(/Pagina \d+ de \d+/gi, '')
            .replace(/Emitido em: .*/gi, '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase();

          const tokens = conteudo.match(/[\d,.]+|[a-zA-Z]+/g) || [];
          const conteudoFormatado = tokens.join(' ');

          const camposEsperados = linhaNormalizada.split(' ');
          let indexAtual = 0;
          const encontrado = camposEsperados.every((campo) => {
            const pos = conteudoFormatado.indexOf(campo, indexAtual);
            if (pos === -1) return false;
            indexAtual = pos + campo.length;
            return true;
          });

          expect(encontrado).to.be.true;
        });
      }
    });
  });

  cy.wrap(Promise.all(promises)).then(() => {
    cy.task('limparDownloads');
  });
});


// CAPTURAR E VALIDAR DADOS DA GRID (CTs Consulta)

Cypress.Commands.add('capturarValidarGrid', () => {
  const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';
  cy.origin(baseUrlCcr, () => {
    const dados = [];
    cy.get('table tbody tr', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .each(($tr) => {
        const texto = $tr.text().trim().replace(/\s+/g, ' ');
        dados.push(texto);
      })
      .then(() => {
        // Validar aqui dentro
        expect(dados.length).to.be.greaterThan(0);
        dados.forEach((registro, index) => {
          expect(registro.trim()).to.not.be.empty;
        });
      });
  });
});



// BOTÃO EXPORTAR E BOTÃO EXCEL, TXT E PDF
Cypress.Commands.add('exportarArquivos', (tipos = ['Excel', 'TXT', 'PDF']) => {
  cy.origin(baseUrlCcr, { args: { tipos } }, ({ tipos }) => {
    cy.contains('span', 'Exportar').click();
    tipos.forEach(tipo => {
      cy.contains('li', tipo).click({ force: true });
    });
    cy.wait(3000);
  });
});



// VALIDAR CONTEÚDO DOS ARQUIVOS EXPORTADOS COM A CONST dadosEsperados

Cypress.Commands.add('validarArquivosExportados', (dadosEsperados, extensoes = ['.xlsx', '.txt', '.pdf']) => {
  const downloadsFolder = Cypress.config('downloadsFolder');

  extensoes.forEach((ext) => {
    cy.task('findDownloadedFile', { folder: downloadsFolder, extension: ext }).then((fileName) => {
      const filePath = `${downloadsFolder}/${fileName}`;

      if (ext === '.xlsx') {
        cy.task('readExcel', filePath).then((rows) => {
          const conteudo = rows.flat().join(' ').replace(/\s+/g, ' ');
          dadosEsperados.forEach(linha => expect(conteudo).to.include(linha));
        });
      }

      if (ext === '.txt') {
        cy.task('readTXT', filePath).then((text) => {
          const textoFormatado = text.replace(/\s+/g, ' ');
          dadosEsperados.forEach(linha => expect(textoFormatado).to.include(linha));
        });
      }

      if (ext === '.pdf') {
        cy.task('readPDF', filePath).then((text) => {
          const textoFormatado = text.replace(/\s+/g, ' ');
          dadosEsperados.forEach(linha => expect(textoFormatado).to.include(linha));
        });
      }
    });
  });
});


// VALIDAR DADOS DA GRID COM DADOS ARQUIVOS EXPORTADOS (EXCEL, TXT e PDF)
Cypress.Commands.add('validarExportacaoComDadosDaGrid', (extensoes = ['.xlsx', '.txt', '.pdf']) => {
  const baseUrlCcr = 'https://homol-ccr.fazenda.df.gov.br';
  const downloadsFolder = Cypress.config('downloadsFolder');

  // Função de normalização de texto
  const normalizar = (texto) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/\s+/g, ' ')            // Espaços múltiplos
      .trim()
      .toLowerCase();

  // Etapa 1: Captura os dados da grid e exporta os arquivos
  cy.origin(baseUrlCcr, { args: { extensoes } }, ({ extensoes }) => {
    const dados = [];

    cy.get('table tbody tr').each(($row) => {
      const linha = [];

      cy.wrap($row).find('td').each(($cell) => {
        const valor = $cell.text().trim().replace(/\s+/g, ' ');
        if (valor !== '') {
          linha.push(valor);
        }
      }).then(() => {
        if (linha.length > 0) {
          dados.push(linha.join(' '));
        }
      });
    });

    cy.contains('span', 'Exportar').click();

    extensoes.forEach((tipo) => {
      const nome = tipo === '.xlsx' ? 'Excel' :
                   tipo === '.txt' ? 'TXT' :
                   tipo === '.pdf' ? 'PDF' : '';
      if (nome) {
        cy.contains('li', nome).click({ force: true });
      }
    });

    cy.wait(5000); // Aguardar exportação

    cy.wrap(null).then(() => dados); // Retorna os dados para o Cypress principal
  }).then((dadosGrid) => {
    const dadosGridNormalizados = dadosGrid.map(normalizar);

    // Etapa 2: Leitura dos arquivos e validação
    extensoes.forEach((ext) => {
      cy.task('findDownloadedFile', { folder: downloadsFolder, extension: ext }).then((fileName) => {
        const filePath = `${downloadsFolder}/${fileName}`;

        const validarConteudo = (conteudoArquivo) => {
          const textoArquivo = normalizar(conteudoArquivo);
          dadosGridNormalizados.forEach(linha => {
            expect(textoArquivo).to.include(linha);
          });
        };

        if (ext === '.xlsx') {
          cy.task('readExcel', filePath).then((rows) => {
            const conteudo = rows.flat().join(' ');
            validarConteudo(conteudo);
          });
        }

        if (ext === '.txt') {
          cy.task('readTXT', filePath).then(validarConteudo);
        }

        if (ext === '.pdf') {
          cy.task('readPDF', filePath).then(validarConteudo);
        }
      });
    });
  });
});






// validar somente o número consultado na exportação
Cypress.Commands.add('validarArquivosExtracao', (numero, extensoes = ['.xlsx', '.txt']) => {
  const downloadsFolder = Cypress.config('downloadsFolder');

  const normalizar = (texto) =>
    (texto ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const numeroNormalizado = normalizar(numero);

  extensoes.forEach((ext) => {
    cy.task('findDownloadedFile', { folder: downloadsFolder, extension: ext }).then((fileName) => {
      const filePath = `${downloadsFolder}/${fileName}`;

      if (ext === '.xlsx') {
        cy.task('readExcel', filePath).then((rows) => {
          const conteudo = rows.flat().join(' ');
          const textoFormatado = normalizar(conteudo);
          expect(textoFormatado).to.include(numeroNormalizado);
        });
      }

      if (ext === '.txt') {
        cy.task('readTXT', filePath).then((text) => {
          const textoFormatado = normalizar(text);
          expect(textoFormatado).to.include(numeroNormalizado);
        });
      }
    });
  });
});



// LIMPAR CAMPO "NUMERO SORTEIO"
Cypress.Commands.add('limparNumeroSorteio', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('#numeroSorteio').clear({ force: true });
  });
});

// LIMPAR CAMPO "CPF/CNPJ"
Cypress.Commands.add('limparCpfCnpj', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('#cpfCnpj').clear({ force: true });
  });
});

// LIMPAR CAMPO "SEQUENCIAL"
Cypress.Commands.add('limparSequencial', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('#sequencial').clear({ force: true });
  });
});

// LIMPAR CAMPO "RECLAMAÇÃO"
Cypress.Commands.add('limparReclamacao', () => {
  cy.origin(baseUrlCcr, () => {
    cy.get('#reclamacao').clear({ force: true });
  });
});

// VALIDAR MENSAGEM DE CAMPOS OBRIGATÓRIOS
Cypress.Commands.add('validarMensagemCampoObrigatorio', () => {
  cy.origin(baseUrlCcr, () => {
    cy.contains('Pelo menos um campo deve ser preenchido.').should('be.visible');
  });
});

// VALIDAR MENSAGEM DE REGISTROS DUPLICADOS
Cypress.Commands.add('validarMensagemRegistrosDuplicado', () => {
  cy.origin(baseUrlCcr, () => {
    cy.contains('Para realizar essa ação é necessário selecionar somente um registro na tabela.').should('be.visible');
  });
});

// VALIDAR MENSAGEM DE "REVISAR BEM"
Cypress.Commands.add('validarMensagemRevisarBem', () => {
  cy.origin(baseUrlCcr, () => {
    cy.contains('Validação de integração com o SITAF realizada com sucesso.').should('be.visible');
  });
});

// VALIDAR MENSAGEM DE SUCESSO "Operação realizada com sucesso."
Cypress.Commands.add('validarMensagemSucesso', () => {
  cy.origin(baseUrlCcr, () => {
    cy.contains('Operação realizada com sucesso.').should('be.visible');
  });
});

// VALIDAR MENSAGEM DE ERRO AO VALIDAR INSCRIÇÃO IPTU (INDICAÇÃO)
Cypress.Commands.add('mensagemImovelInvalido', () => {
  cy.origin(baseUrlCcr, () => {
    cy.contains('Número da inscrição do imóvel inválido.').should('be.visible');
  });
});

// VALIDAR MENSAGEM DE ERRO AO VALIDAR RENAVAM (INDICAÇÃO)
Cypress.Commands.add('mensagemRenavamInvalido', () => {
  cy.origin(baseUrlCcr, () => {
    cy.contains('Número do RENAVAM inválido.').should('be.visible');
  });
});


// AGUARDAR TEMPO FIXO
Cypress.Commands.add('esperar', (tempo = 500) => {
  cy.wait(tempo);
});

// SELECIONAR CHECKBOX (PODENDO USAR cy.selecionarCheckboxs([0, 2, 4]); // 1ª, 3ª e 5ª linhas)
Cypress.Commands.add('selecionarCheckboxs', (quantidade = 1) => {
  cy.origin(baseUrlCcr, { args: { quantidade } }, ({ quantidade }) => {
    cy.get('table tbody tr').each(($row, index) => {
      if (index < quantidade) {
        cy.wrap($row).find('.p-checkbox-box').click({ force: true });
      }
    });
  });
});

// VALIDAR DADOS VISIVEL
Cypress.Commands.add('validarDadoVisivel', (dado) => {
  cy.origin(baseUrlCcr, { args: { dado } }, ({ dado }) => {
    cy.contains(dado).should('be.visible');
  });
});

// SELECIONAR COMBOBOX
Cypress.Commands.add('selecionarComboBox', (texto) => {
  cy.origin(baseUrlCcr, { args: { texto } }, ({ texto }) => {
    cy.get('span[role="combobox"]').click();
    cy.contains('li', texto).click({ force: true });
  });
});


// NORMALIZAR TEXTOS
Cypress.Commands.add('normalizarTexto', (texto) => {
  return texto
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/(\d{4})(\d{2})(\d{2})/g, '$3/$2/$1') // AAAAMMDD → DD/MM/AAAA
    .replace(/,(\d)(?!\d)/g, ',$10')               // ex: 199,9 → 199,90
    .toLowerCase()
    .trim();
});

