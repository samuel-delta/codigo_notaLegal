# language: pt

Funcionalidade: CCR NOVO - Consultar Indicacao IPTU IPVA Pelo Fisco
  
  Contexto:
    Dado que o usuário esteja logado no ReceitaWeb CONSULTARINDICACAO_CT01
    E que o usuário esteja na funcionalidade "Indicação para IPTU IPVA pelo FISCO" CONSULTARINDICACAO_CT01


   Cenário: CT01 - Consultar indicações de bens para IPTU/IPVA
    Quando informar os parâmetros obrigatórios da consulta CONSULTARINDICACAO_CT01
    E acionar o botão Consultar CONSULTARINDICACAO_CT01
    Então o sistema exibe a listagem de registros de acordo com os parâmetros informados CONSULTARINDICACAO_CT01

 #  Cenário: CT02 - Consulta sem parâmetros obrigatórios
 #   Quando não informar os parâmetros obrigatórios da consulta CONSULTARINDICACAO_CT02
 #   E acionar o botão Consultar CONSULTARINDICACAO_CT02
 #   Então o sistema exibe a mensagem "Pelo menos um campo deve ser preenchido." CONSULTARINDICACAO_CT02

 # Cenário: CT03 - Exportar todos os dados da consulta
 #   Quando o usuário realizar uma consulta válida CONSULTARINDICACAO_CT03
 #   E acionar a opção Exportar sem selecionar nenhum registro CONSULTARINDICACAO_CT03
 #   Então o sistema exporta os arquivos e valida os dados dos arquivos exportados CONSULTARINDICACAO_CT03

#  Cenário: CT04 - Exportar apenas os registros selecionados
#    Quando o usuário realizar uma consulta válida CONSULTARINDICACAO_CT04
#    E que o usuário tenha selecionado registros da listagem CONSULTARINDICACAO_CT04
#    E acionar a opção Exportar CONSULTARINDICACAO_CT04
#    Então o sistema exporta os arquivos e valida os dados dos arquivos exportados CONSULTARINDICACAO_CT04

    
 # Cenário: CT05 - Extração de dados Excel e TXT
 #  Quando o usuario acessar o botão Extração de Dados CONSULTARINDICACAO_CT05
 #  E preencher os parâmetros da extração CONSULTARINDICACAO_CT05
 #  E acionar a opção Exportar nos formatos Excel e TXT CONSULTARINDICACAO_CT05
 #  Então o sistema exporta os arquivos e valida os dados dos arquivos exportados CONSULTARINDICACAO_CT05
