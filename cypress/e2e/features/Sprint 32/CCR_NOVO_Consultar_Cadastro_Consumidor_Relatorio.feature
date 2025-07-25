# language: pt

Funcionalidade: Cadastro de Consumidores - Relatório
  Como usuário da funcionalidade Sorteio
  Quero validar arquivos e exportar dados corretamente
  Para garantir a qualidade e integridade das operações

  Contexto:
    Dado que o usuário esteja logado RELATÓRIO_CT01
    E que o usuário esteja na funcionalidade "Cadastro de Consumidores - Relatório" RELATÓRIO_CT01

 # Cenário: CT01: Consultar cadastro consumidor
  #  Quando informar os parâmetros obrigatórios da consulta RELATÓRIO_CT01
   # E acionar o botão Consultar RELATÓRIO_CT01
   # Então o sistema exibe a listagem de registros de acordo com os parâmetros informados RELATÓRIO_CT01

  # Cenário: CT02: Consultar cadastro consumidor [campos obrigatórios]
   # Quando não informar os parâmetros obrigatórios da consulta RELATÓRIO_CT02
   # E acionar o botão Consultar RELATÓRIO_CT02
   # Então o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." RELATÓRIO_CT02

  Cenário: CT03: Exportar todos os registros da consulta
    Dado que o usuário tenha realizado uma consulta válida RELATÓRIO_CT03
    Quando acionar a opção Exportar sem selecionar nenhum registro RELATÓRIO_CT03
    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados RELATÓRIO_CT03

 # Cenário: CT04: Exportar registros selecionados
  #  Dado que o usuário tenha realizado uma consulta válida RELATÓRIO_CT04
   # E que o usuário tenha selecionado registros da listagem RELATÓRIO_CT04
   # Quando acionar a opção Exportar RELATÓRIO_CT04
   # Então o sistema exporta os arquivos e valida os dados dos arquivos exportados RELATÓRIO_CT04

 # Cenário: CT05: Realizar extração de dados nos formatos Excel e TXT
  #  Dado que o usuário tenha acessado o menu Extração de Dados da funcionalidade RELATÓRIO_CT05
   # Quando preencher os parâmetros da extração RELATÓRIO_CT05
   # E acionar a opção Exportar nos formatos Excel e TXT RELATÓRIO_CT05
   # Então o sistema exporta os arquivos e valida os dados dos arquivos exportados RELATÓRIO_CT05
