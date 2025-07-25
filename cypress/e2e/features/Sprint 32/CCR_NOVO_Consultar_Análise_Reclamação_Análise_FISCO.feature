# language: pt

Funcionalidade: CCR NOVO- Consultar Analise Reclamacao-Analise pelo FISCO
  

  Contexto:
    Dado que o usuário esteja logado no ReceitaWeb FISCO_CT01
    E que o usuário esteja na funcionalidade "Manter Análise da Reclamação" FISCO_CT01


   Cenário: CT01 - Consultar analise reclamação- analise pelo FISCO
    Quando informar os parâmetros obrigatórios da consulta FISCO_CT01
    E acionar o botão Consultar FISCO_CT01
    Então o sistema exibe a listagem de registros de acordo com os parâmetros informados FISCO_CT01

  Cenário: CT02 - Consulta sem parâmetros obrigatórios
    Quando não informar os parâmetros obrigatórios da consulta FISCO_CT02
    E acionar o botão Consultar FISCO_CT02
    Então o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." FISCO_CT02

  Cenário: CT03 - Exportar todos os dados da consulta
    Quando o usuário realizar uma consulta válida FISCO_CT03
    E acionar a opção Exportar sem selecionar nenhum registro FISCO_CT03
    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados FISCO_CT03

  Cenário: CT04 - Exportar apenas os registros selecionados
    Quando o usuário realizar uma consulta válida FISCO_CT04
    E que o usuário tenha selecionado registros da listagem FISCO_CT04
    E acionar a opção Exportar FISCO_CT04
    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados FISCO_CT04

    
  Cenário: CT05 - Extração de dados Excel e TXT
   Quando o usuario acessar o botão Extração de Dados FISCO_CT05
   E preencher os parâmetros da extração FISCO_CT05
   E acionar a opção Exportar nos formatos Excel e TXT FISCO_CT05
   Então o sistema exporta os arquivos e valida os dados dos arquivos exportados FISCO_CT05
