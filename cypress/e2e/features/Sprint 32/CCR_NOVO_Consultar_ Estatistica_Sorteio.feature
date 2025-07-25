# language: pt

Funcionalidade: CCR NOVO- Consultar Estatistica Sorteio
  Como usuário da funcionalidade Sorteio
  Quero validar arquivos e exportar dados corretamente
  Para garantir a qualidade e integridade das operações

  Contexto:
    Dado que o usuário esteja logado ESTATISTICA_CT01
    E que o usuário esteja na funcionalidade "Estatística do Sorteio" ESTATISTICA_CT01


   Cenário: CT01 - Consulta válida com número do sorteio preenchido
    Quando informar os parâmetros obrigatórios da consulta ESTATISTICA_CT01
    E acionar o botão Consultar ESTATISTICA_CT01
    Então o sistema exibe a listagem de registros de acordo com os parâmetros informados ESTATISTICA_CT01

  Cenário: CT02 - Consulta sem parâmetros obrigatórios
    Quando não informar os parâmetros obrigatórios da consulta ESTATISTICA_CT02
    E acionar o botão Consultar ESTATISTICA_CT02
    Então o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." ESTATISTICA_CT02

  Cenário: CT03 - Exportar todos os dados da consulta
    Quando o usuário realizar uma consulta válida ESTATISTICA_CT03
    E acionar a opção Exportar sem selecionar nenhum registro ESTATISTICA_CT03
    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados ESTATISTICA_CT03

  Cenário: CT04 - Exportar apenas os registros selecionados
    Quando o usuário realizar uma consulta válida ESTATISTICA_CT04
    E que o usuário tenha selecionado registros da listagem ESTATISTICA_CT04
    E acionar a opção Exportar ESTATISTICA_CT04
    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados ESTATISTICA_CT04

    
  Cenário: CT05 - Extração de dados Excel e TXT
   Quando o usuario acessar o botão Extração de Dados ESTATISTICA_CT05
   E preencher os parâmetros da extração ESTATISTICA_CT05
   E acionar a opção Exportar nos formatos Excel e TXT ESTATISTICA_CT05
   Então o sistema exporta os arquivos e valida os dados dos arquivos exportados ESTATISTICA_CT05
