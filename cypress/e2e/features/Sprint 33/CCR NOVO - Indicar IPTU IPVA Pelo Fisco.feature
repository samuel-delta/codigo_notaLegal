# language: pt

Funcionalidade: CCR NOVO - Consultar Indicacao IPTU IPVA Pelo Fisco
  
  Contexto:
    Dado que o usuário esteja logado no ReceitaWeb INDICACAO_CT01
    E que o usuário esteja na funcionalidade "Indicação para IPTU IPVA pelo FISCO" INDICACAO_CT01


   Cenário: CT01 - Realizar indicação de créditos para IPVA (Veículos) pelo FISCO
    Quando informar os parâmetros obrigatórios da consulta INDICACAO_CT01
    E selecionar um registro para indicação de créditos para IPVA INDICACAO_CT01
    E preencher os campos obrigatórios para realizar a indicação INDICACAO_CT01
    Então o sistema exibe a mensagem de sucesso "Operação realizada com sucesso." INDICACAO_CT01

   Cenário: CT02 - Realizar indicação de créditos para IPTU (Imóveis) pelo FISCO
    Quando informar os parâmetros obrigatórios da consulta INDICACAO_CT02
    E selecionar um registro para indicação de créditos para IPTU INDICACAO_CT02
    E preencher os campos obrigatórios para realizar a indicação INDICACAO_CT02
    Então o sistema exibe a mensagem de sucesso "Operação realizada com sucesso." INDICACAO_CT02

  Cenário: CT03 - Selecionar mais de um registro e acionar “Indicar”
    Quando o usuário realizar uma consulta válida INDICACAO_CT03
    E selecionar mais de um registro INDICACAO_CT03
    E acionar o botão Indicar INDICACAO_CT03
    Então o sistema exibe a mensagem "Para realizar essa ação é necessário selecionar somente um registro na tabela." INDICACAO_CT03

  Cenário: CT04 - Validar campos obrigatórios na indicação
    Quando o usuário realizar uma consulta válida INDICACAO_CT04
    E que o usuário tenha selecionado um registro da listagem para indicar INDICACAO_CT04
    E não informar os parâmetros obrigatórios para indicação INDICACAO_CT04
    Então o sistema exibe a mensagem "Motivação é obrigatório." INDICACAO_CT04

    
  Cenário: CT05 - Informar Inscrição inválida
   Quando o usuário realizar uma consulta válida INDICACAO_CT05
   E que o usuário tenha selecionado um registro da listagem para indicar INDICACAO_CT05
   E preencher o campo "Inscrição" com dados invalidos INDICACAO_CT05
   Então o sistema apresenta a mensagem "Número da inscrição do imóvel inválido."INDICACAO_CT05


 Cenário: CT06 - Informar Renavam inválido
   Quando o usuário realizar uma consulta válida INDICACAO_CT06
   E que o usuário tenha selecionado um registro da listagem para indicar INDICACAO_CT06
   E preencher o campo "Renavam" com dados invalidos INDICACAO_CT06
   Então o sistema apresenta a mensagem "Número do RENAVAM inválido."INDICACAO_CT06




