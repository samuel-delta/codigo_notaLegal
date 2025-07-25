# language: pt

Funcionalidade: CCR NOVO - Revisar Bem
  
  Contexto:
    Dado que o usuário esteja logado no ReceitaWeb REVISAR_CT01
    E que o usuário esteja na funcionalidade "Revisão de Bem pelo Fisco" REVISAR_CT01


   Cenário: CT01 - Realizar revisão de um bem com sucesso
    Quando informar os parâmetros obrigatórios da consulta REVISAR_CT01
    E acionar o botão Buscar Bem Fisco REVISAR_CT01
    E E acionar o botão Revisar Bem REVISAR_CT01
    Então o sistema exibe a mensagem de sucesso "Validação de integração com o SITAF realizada com sucesso.". REVISAR_CT01

  Cenário: CT02 - Selecionar mais de um registro
    Quando informar os parâmetros obrigatórios da consulta REVISAR_CT02
    E selecionar mais de um registro REVISAR_CT02
    E acionar o botão Buscar Bem Fisco REVISAR_CT02
    Então o sistema exibe a mensagem "Para realizar essa ação é necessário selecionar somente um registro na tabela." REVISAR_CT02