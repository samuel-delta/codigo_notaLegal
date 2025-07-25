# language: pt

Funcionalidade: CCR NOVO - Consultar Revisao Bem Pelo Fisco
  
  Contexto:
    Dado que o usuário esteja logado no ReceitaWeb BEM_CT01
    E que o usuário esteja na funcionalidade "Revisão de Bem pelo Fisco" BEM_CT01


 #  Cenário: CT01 - Consultar revisão de bem
 #   Quando informar os parâmetros obrigatórios da consulta BEM_CT01
 #   E acionar o botão Consultar BEM_CT01
 #   Então o sistema exibe a listagem de registros de acordo com os parâmetros informados BEM_CT01

 #  Cenário: CT02 - Consulta sem parâmetros obrigatórios
 #   Quando não informar os parâmetros obrigatórios da consulta BEM_CT02
 #   E acionar o botão Consultar BEM_CT02
 #   Então o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." BEM_CT02

 # Cenário: CT03 - Exportar todos os dados da consulta
 #   Quando o usuário realizar uma consulta válida BEM_CT03
 #   E acionar a opção Exportar sem selecionar nenhum registro BEM_CT03
 #   Então o sistema exporta os arquivos e valida os dados dos arquivos exportados BEM_CT03

 # Cenário: CT04 - Exportar apenas os registros selecionados
 #   Quando o usuário realizar uma consulta válida BEM_CT04
 #   E que o usuário tenha selecionado registros da listagem BEM_CT04
 #   E acionar a opção Exportar BEM_CT04
 #   Então o sistema exporta os arquivos e valida os dados dos arquivos exportados BEM_CT04

    
  Cenário: CT05 - Extração de dados Excel e TXT
   Quando o usuario acessar o botão Extração de Dados BEM_CT05
   E preencher os parâmetros da extração BEM_CT05
   E acionar a opção Exportar nos formatos Excel e TXT BEM_CT05
   Então o sistema exporta os arquivos e valida os dados dos arquivos exportados BEM_CT05
