# language: pt

Funcionalidade: CCR NOVO - Consultar Análise Reclamação - Análise pelo FISCO

Cenário: CT01 - Consultar análise de reclamação com parâmetros obrigatórios
  Dado que o usuário esteja logado
  E que o usuário esteja na funcionalidade "Manter Análise da Reclamação" CT001
  Quando informar os parâmetros obrigatórios da consulta CT001
  E acionar o botão Consultar CT001
  Então o sistema exibe a listagem de registros de acordo com os parâmetros informados CT001

Cenário: CT02 - Consultar análise reclamação sem preencher campos obrigatórios
  Dado que o usuário esteja logado
  E que o usuário esteja na funcionalidade "Manter Análise da Reclamação" CT001
  Quando não informar os parâmetros obrigatórios da consulta CT001
  E acionar o botão Consultar CT001
  Então o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." CT001


Cenário: CT04: Exportar registros selecionados   
  Dado que o usuário esteja logado
  E que o usuário tenha realizado uma consulta válida com número de reclamação específico CT004
  E que o usuário tenha selecionado registros da listagem CT004
  Quando acionar a opção Exportar CT004
  Então o sistema exporta apenas os registros selecionados e valida os dados dos arquivos exportados CT004

Cenário: CT05 - Extração de dados Excel e TXT
  Dado que o usuário tenha acessado o menu Extração de Dados da funcionalidade CT005
  Quando preencher os parâmetros da extração CT005
  E acionar a opção Exportar nos formatos Excel e TXT CT005
  Então o sistema exporta os arquivos e valida os dados dos arquivos exportados CT005

  Cenário: CT03 - Exportar todos os registros da consulta
  Dado que o usuário esteja logado
  E que o usuário tenha realizado uma consulta valida CT001
  Quando acionar a opção Exportar sem selecionar nenhum registro CT001
  Então o sistema exporta os arquivos e valida os dados dos arquivos exportados CT001
