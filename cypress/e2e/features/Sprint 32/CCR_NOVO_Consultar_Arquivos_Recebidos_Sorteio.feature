# language: pt

Funcionalidade: Validar Arquivo do Sorteio
  Como usuário da funcionalidade Sorteio
  Quero validar arquivos e exportar dados corretamente
  Para garantir a qualidade e integridade das operações

  Contexto:
    Dado que o usuário esteja logado SORTEIO_CT01
    E que o usuário esteja na funcionalidade "Validar Arquivo do Sorteio" SORTEIO_CT01


   Cenário: CT01 - Consulta válida com número do sorteio preenchido
    Quando informar os parâmetros obrigatórios da consulta SORTEIO_CT01
    E acionar o botão Consultar SORTEIO_CT01
    Então o sistema exibe a listagem de registros de acordo com os parâmetros informados SORTEIO_CT01

  Cenário: CT02 - Consulta sem parâmetros obrigatórios
    Quando não informar os parâmetros obrigatórios da consulta SORTEIO_CT02
    E acionar o botão Consultar SORTEIO_CT02
    Então o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." SORTEIO_CT02

  Cenário: CT03 - Exportar todos os dados da consulta
    Dado que o usuário tenha realizado uma consulta válida SORTEIO_CT03
    Quando acionar a opção Exportar sem selecionar nenhum registro SORTEIO_CT03
    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados SORTEIO_CT03

  Cenário: CT04 - Exportar apenas os registros selecionados
    Dado que o usuário tenha realizado uma consulta válida com número de sorteio específico SORTEIO_CT04
    E que o usuário tenha selecionado registros da listagem SORTEIO_CT04
    Quando acionar a opção Exportar SORTEIO_CT04
    Então o sistema exporta apenas os registros selecionados e valida os dados dos arquivos exportados SORTEIO_CT04

    
  Cenário: CT05 - Extração de dados Excel e TXT
    Dado que o usuário tenha acessado o menu Extração de Dados da funcionalidade SORTEIO_CT05
    Quando preencher os parâmetros da extração SORTEIO_CT05
    E acionar a opção Exportar nos formatos Excel e TXT SORTEIO_CT05
    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados SORTEIO_CT05
